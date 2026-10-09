"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ISkill } from "@/types/general";
import { getOrbitLayout } from "./orbit-layout";

interface Props { skills: ISkill[]; lite: boolean; paused?: boolean; }

function Orbit({ skills, paused }: { skills: ISkill[]; paused: boolean }) {
  const layout = useMemo(() => getOrbitLayout(skills.length), [skills.length]);
  const { size, camera } = useThree();
  const rig = useRef<THREE.Group>(null);
  const projected = useMemo(() => new THREE.Vector3(), []);
  const spin = useRef({ dragging: false, lastX: 0, velocity: 0 });
  const lines = useMemo(() => layout.rings.map(ring => {
    const points = Array.from({ length: 129 }, (_, i) => {
      const angle = i / 128 * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * ring.radius * 10, Math.sin(angle) * ring.radius * 10, 0);
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }), [layout]);
  const [accent, support] = useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    // Resolve the existing CSS palette through the browser into Three-compatible sRGB.
    const resolve = (token: string) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Color();
      ctx.fillStyle = styles.getPropertyValue(token).trim();
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
    };
    return [resolve("--portfolio-accent"), resolve("--portfolio-support")];
  }, []);
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = Math.min(size.width, size.height) / 10;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);
  useEffect(() => () => lines.forEach(line => line.dispose()), [lines]);
  useFrame((state, rawDelta) => {
    const group = rig.current;
    if (!group || paused) return;
    const dt = Math.min(rawDelta, 0.05);
    const s = spin.current;
    group.rotation.z += (0.035 + s.velocity) * dt;
    if (!s.dragging) s.velocity *= Math.exp(-3 * dt);
    group.rotation.x += (state.pointer.y * 0.1 - group.rotation.x) * (1 - Math.exp(-3 * dt));
    group.rotation.y += (state.pointer.x * 0.1 - group.rotation.y) * (1 - Math.exp(-3 * dt));
  });
  return <group ref={rig}
    onPointerDown={e => { spin.current.dragging = true; spin.current.lastX = e.clientX; if (e.target instanceof Element) e.target.setPointerCapture(e.pointerId); }}
    onPointerUp={e => { spin.current.dragging = false; if (e.target instanceof Element && e.target.hasPointerCapture(e.pointerId)) e.target.releasePointerCapture(e.pointerId); }}
    onPointerCancel={() => { spin.current.dragging = false; }}
    onPointerMove={e => { const s = spin.current; if (!s.dragging) return; s.velocity = THREE.MathUtils.clamp((e.clientX - s.lastX) * 0.03, -1.2, 1.2); s.lastX = e.clientX; }}>
    <mesh><circleGeometry args={[4.8, 48]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh>
    {lines.map((geometry, i) => <lineLoop key={i} geometry={geometry}><lineBasicMaterial color={i % 2 ? support : accent} transparent opacity={0.24} /></lineLoop>)}
    {layout.slots.map(slot => {
      const skill = skills[slot.index];
      return <group key={skill._id ?? `${skill.name}-${slot.index}`} position={[Math.cos(slot.angle) * slot.radius * 10, Math.sin(slot.angle) * slot.radius * 10, 0]}>
        <Html center zIndexRange={[20, 0]}>
          <div className="orbit-skill-badge" title={skill.name} style={{ width: Math.min(size.width, size.height) * layout.badgeSize }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.imageUrl} alt={skill.name} draggable={false} />
            <span className="orbit-skill-label">{skill.name}</span>
          </div>
        </Html>
      </group>;
    })}
  </group>;
}

export default function SkillsOrbitScene({ skills, lite, paused = false }: Props) {
  return <Canvas orthographic frameloop={paused ? "demand" : "always"} dpr={lite ? [1, 1.25] : [1, 1.5]} camera={{ position: [0, 0, 20], zoom: 40 }} gl={{ antialias: !lite, alpha: true }} style={{ touchAction: "pan-y" }}>
    <Orbit skills={skills} paused={paused} />
  </Canvas>;
}
