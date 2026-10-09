"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ISkill } from "@/types/general";
import { createFloatingPositions, getOrbitLayout, updateFloatingPositions } from "./orbit-layout";

interface Props { skills: ISkill[]; lite: boolean; paused?: boolean; }

function FloatingSkills({ skills, paused, badges }: { skills: ISkill[]; paused: boolean; badges: React.RefObject<(HTMLDivElement | null)[]> }) {
  const layout = useMemo(() => getOrbitLayout(skills.length), [skills.length]);
  const positions = useMemo(() => createFloatingPositions(skills.length), [skills.length]);
  const { size, camera } = useThree();
  const projected = useMemo(() => new THREE.Vector3(), []);
  const animation = useRef({ time: 0, rotation: 0, dragging: false, lastX: 0, velocity: 0, x: 0, y: 0 });

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = Math.min(size.width, size.height) / 10;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const a = animation.current;
    if (!paused) {
      a.time += dt;
      a.rotation += a.velocity * dt;
      if (!a.dragging) a.velocity *= Math.exp(-3 * dt);
      a.x += (state.pointer.x * 0.004 - a.x) * (1 - Math.exp(-3 * dt));
      a.y += (state.pointer.y * 0.004 - a.y) * (1 - Math.exp(-3 * dt));
    }
    updateFloatingPositions(layout, positions, a.time, a.rotation);
    positions.forEach((position, i) => {
      const badge = badges.current[i];
      if (!badge) return;
      projected.set((position.x + a.x) * 10, (position.y + a.y) * 10, position.z).project(camera);
      const x = (projected.x + 1) * size.width / 2;
      const y = (1 - projected.y) * size.height / 2;
      badge.style.left = `${x}px`;
      badge.style.top = `${y}px`;
      const edge = Math.min(size.width, size.height) * layout.badgeSize;
      badge.style.width = `${edge}px`;
      badge.style.padding = `${edge * 0.16}px`;
    });
  });

  return <>
    <mesh
      onPointerDown={e => { const a = animation.current; a.dragging = true; a.lastX = e.clientX; if (e.target instanceof Element) e.target.setPointerCapture(e.pointerId); }}
      onPointerUp={e => { animation.current.dragging = false; if (e.target instanceof Element && e.target.hasPointerCapture(e.pointerId)) e.target.releasePointerCapture(e.pointerId); }}
      onPointerCancel={() => { animation.current.dragging = false; }}
      onPointerMove={e => { const a = animation.current; if (!a.dragging || paused) return; a.velocity = THREE.MathUtils.clamp((e.clientX - a.lastX) * 0.02, -0.8, 0.8); a.lastX = e.clientX; }}>
      <circleGeometry args={[4.9, 48]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>

  </>;
}

export default function SkillsOrbitScene({ skills, lite, paused = false }: Props) {
  const badges = useRef<(HTMLDivElement | null)[]>([]);
  return <>
    <div className="pointer-events-none absolute inset-0 z-20">
      {skills.map((skill, i) => <div key={skill._id ?? `${skill.name}-${i}`}
        ref={node => { badges.current[i] = node; }} className="orbit-skill-badge pointer-events-auto" title={skill.name}
        style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={skill.imageUrl} alt={skill.name} draggable={false} />
        <span className="orbit-skill-label">{skill.name}</span>
      </div>)}
    </div>
    <Canvas orthographic frameloop={paused ? "demand" : "always"} dpr={lite ? [1, 1.25] : [1, 1.5]} camera={{ position: [0, 0, 20], zoom: 40 }} gl={{ antialias: !lite, alpha: true }} style={{ touchAction: "pan-y" }}>
      <FloatingSkills skills={skills} paused={paused} badges={badges} />
    </Canvas>
  </>;
}
