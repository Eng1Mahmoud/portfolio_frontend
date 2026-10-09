"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ISkill } from "@/types/general";
import { createFloatingPositions, getSphereLayout, updateFloatingPositions } from "./orbit-layout";

interface Props { skills: ISkill[]; lite: boolean; paused?: boolean; }

/** Normalized units (the display spans -0.5 to 0.5) to world units. */
const WORLD = 10;
const SEGMENTS = 64;

/** Faint globe cage — three latitude circles and two meridians — so the shell reads as a sphere. */
function useGlobeGeometry(radius: number) {
  const circles = useMemo(() => {
    const built: THREE.BufferGeometry[] = [];
    const add = (point: (a: number) => [number, number, number]) => {
      const positions: number[] = [];
      for (let i = 0; i <= SEGMENTS; i++) positions.push(...point((i / SEGMENTS) * Math.PI * 2));
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      built.push(geometry);
    };
    [-0.55, 0, 0.55].forEach(h => {
      const ring = radius * Math.sqrt(1 - h * h);
      add(a => [Math.cos(a) * ring, h * radius, Math.sin(a) * ring]);
    });
    [0, Math.PI / 2].forEach(phi => {
      add(a => [Math.cos(a) * radius * Math.cos(phi), Math.sin(a) * radius, -Math.cos(a) * radius * Math.sin(phi)]);
    });
    return built;
  }, [radius]);
  useEffect(() => () => circles.forEach(circle => circle.dispose()), [circles]);
  return circles;
}

function FloatingSkills({ skills, paused, badges }: { skills: ISkill[]; paused: boolean; badges: React.RefObject<(HTMLDivElement | null)[]> }) {
  const layout = useMemo(() => getSphereLayout(skills.length), [skills.length]);
  const positions = useMemo(() => createFloatingPositions(skills.length), [skills.length]);
  const globe = useGlobeGeometry(layout.radius * WORLD);
  const shell = useRef<THREE.Group>(null);
  const { size, camera } = useThree();
  const projected = useMemo(() => new THREE.Vector3(), []);
  const animation = useRef({ time: 0, yaw: 0.4, pitch: 0.28, velocity: 0, dragging: false, lastX: 0, pointerX: 0, pointerY: 0 });

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = Math.min(size.width, size.height) / WORLD;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const a = animation.current;
    if (!paused) {
      a.time += dt;
      if (!a.dragging) {
        // Ease any fling back to a calm constant spin.
        a.velocity += (0.18 - a.velocity) * (1 - Math.exp(-1.5 * dt));
        a.yaw += a.velocity * dt;
      }
      a.pointerX += (state.pointer.x * 0.1 - a.pointerX) * (1 - Math.exp(-2 * dt));
      a.pointerY += (state.pointer.y * 0.08 - a.pointerY) * (1 - Math.exp(-2 * dt));
    }
    const yaw = a.yaw + a.pointerX;
    const pitch = a.pitch + a.pointerY;
    updateFloatingPositions(layout, positions, a.time, yaw, pitch);
    if (shell.current) {
      shell.current.rotation.order = "YXZ";
      shell.current.rotation.y = yaw;
      shell.current.rotation.x = pitch;
    }
    positions.forEach((position, i) => {
      const badge = badges.current[i];
      if (!badge) return;
      projected.set(position.x * WORLD, position.y * WORLD, position.z * WORLD).project(camera);
      const x = (projected.x + 1) * size.width / 2;
      const y = (1 - projected.y) * size.height / 2;
      // Tiles nearer the viewer sit larger, brighter and on top of the ones behind.
      const front = (position.z / layout.radius + 1) / 2;
      const edge = Math.min(size.width, size.height) * layout.badgeSize * (0.82 + 0.18 * front);
      // GPU transform instead of left/top keeps the motion smooth.
      badge.style.left = "0px";
      badge.style.top = "0px";
      badge.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      badge.style.width = `${edge}px`;
      badge.style.padding = `${edge * 0.12}px`;
      // Tiles passing in front of the photo fade out so it always stays clear.
      const screen = Math.hypot(position.x, position.y);
      const clear = front > 0.5 ? THREE.MathUtils.smoothstep(screen, layout.portraitSize * 0.45, layout.portraitSize * 0.7) : 1;
      badge.style.opacity = `${(0.35 + 0.65 * front) * clear}`;
      badge.style.zIndex = `${Math.round(10 + front * 40)}`;
      badge.style.pointerEvents = front > 0.45 && clear > 0.5 ? "auto" : "none";
    });
  });

  return <>
    <group ref={shell}>
      {globe.map((geometry, i) => (
        <lineLoop key={i} geometry={geometry}>
          <lineBasicMaterial color="#7cc4ee" transparent opacity={0.13} depthWrite={false} />
        </lineLoop>
      ))}
    </group>
    <mesh
      onPointerDown={e => { const a = animation.current; a.dragging = true; a.lastX = e.clientX; if (e.target instanceof Element) e.target.setPointerCapture(e.pointerId); }}
      onPointerUp={e => { animation.current.dragging = false; if (e.target instanceof Element && e.target.hasPointerCapture(e.pointerId)) e.target.releasePointerCapture(e.pointerId); }}
      onPointerCancel={() => { animation.current.dragging = false; }}
      onPointerMove={e => { const a = animation.current; if (!a.dragging || paused) return; a.velocity = THREE.MathUtils.clamp((e.clientX - a.lastX) * 0.3, -1.5, 1.5); a.yaw += (e.clientX - a.lastX) * 0.004; a.lastX = e.clientX; }}>
      <circleGeometry args={[4.9, 48]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  </>;
}

export default function SkillsOrbitScene({ skills, lite, paused = false }: Props) {
  const badges = useRef<(HTMLDivElement | null)[]>([]);
  return <>
    <div className="pointer-events-none absolute inset-0 z-40">
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
