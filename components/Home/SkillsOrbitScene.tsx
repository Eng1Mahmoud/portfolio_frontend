"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ISkill } from "@/types/general";

interface Props {
  skills: ISkill[];
  lite: boolean;
}

/** Ring tilt (x, z) and radius — skills are dealt round-robin onto these. */
const RINGS = [
  { radius: 2.35, tilt: [0.35, 0.1], speed: 0.16 },
  { radius: 3.1, tilt: [-0.45, -0.25], speed: -0.11 },
  { radius: 3.8, tilt: [0.15, 0.55], speed: 0.07 },
] as const;

const SkillBadge = ({ skill }: { skill: ISkill }) => {
  const [hover, setHover] = useState(false);
  return (
    <Html center distanceFactor={7} zIndexRange={[20, 0]}>
      <div
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative flex flex-col items-center select-none"
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-surface-panel/80 p-2.5 backdrop-blur-md transition-all duration-300 ${
            hover
              ? "scale-125 border-sage shadow-[0_0_28px_rgba(124,156,255,0.85)]"
              : "border-parchment/15 shadow-[0_0_14px_rgba(124,156,255,0.25)]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.imageUrl}
            alt={skill.name}
            draggable={false}
            className="h-full w-full object-contain"
          />
        </div>
        <span
          className={`pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-full bg-surface-well/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-strong transition-all duration-200 ${
            hover ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
        >
          {skill.name}
        </span>
      </div>
    </Html>
  );
};

const Ring = ({
  skills,
  radius,
  tilt,
  speed,
}: {
  skills: ISkill[];
  radius: number;
  tilt: readonly [number, number];
  speed: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += speed * Math.min(delta, 0.05);
  });

  const ringLine = useMemo(() => {
    const pts = new THREE.EllipseCurve(0, 0, radius, radius).getPoints(128);
    const geo = new THREE.BufferGeometry().setFromPoints(
      pts.map((p) => new THREE.Vector3(p.x, 0, p.y)),
    );
    const mat = new THREE.LineBasicMaterial({
      color: "#7C9CFF",
      transparent: true,
      opacity: 0.22,
    });
    return new THREE.Line(geo, mat);
  }, [radius]);

  return (
    <group rotation={[tilt[0], 0, tilt[1]]}>
      <primitive object={ringLine} />
      <group ref={ref}>
        {skills.map((skill, i) => {
          const a = (i / skills.length) * Math.PI * 2;
          return (
            <group
              key={skill._id ?? skill.name}
              position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}
            >
              <SkillBadge skill={skill} />
            </group>
          );
        })}
      </group>
    </group>
  );
};

/** Tilts the whole system toward the pointer; drag adds spin with inertia. */
const Rig = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  const spin = useRef({ v: 0, dragging: false, lastX: 0 });

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = ref.current;
    if (!g) return;
    const s = spin.current;
    g.rotation.y += s.v * dt;
    if (!s.dragging) s.v *= Math.exp(-2.2 * dt);
    const targetX = state.pointer.y * -0.25;
    const targetZ = state.pointer.x * 0.12;
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.rotation.z += (targetZ - g.rotation.z) * (1 - Math.exp(-3 * dt));
  });

  return (
    <group
      ref={ref}
      onPointerDown={(e) => {
        spin.current.dragging = true;
        spin.current.lastX = e.clientX;
      }}
      onPointerUp={() => (spin.current.dragging = false)}
      onPointerLeave={() => (spin.current.dragging = false)}
      onPointerMove={(e) => {
        const s = spin.current;
        if (!s.dragging) return;
        s.v = (e.clientX - s.lastX) * 0.35;
        s.lastX = e.clientX;
      }}
    >
      {/* Invisible hit sphere so drags register anywhere on the system. */}
      <mesh>
        <sphereGeometry args={[4.2, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
};

const Core = ({ lite }: { lite: boolean }) => (
  <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
    <mesh>
      <icosahedronGeometry args={[1.25, lite ? 8 : 24]} />
      <MeshDistortMaterial
        color="#5B6FD6"
        emissive="#4338CA"
        emissiveIntensity={0.9}
        roughness={0.15}
        metalness={0.6}
        distort={0.38}
        speed={2.2}
      />
    </mesh>
    <mesh scale={1.55}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#7C9CFF" transparent opacity={0.07} />
    </mesh>
    <Html center zIndexRange={[10, 0]} className="pointer-events-none">
      <span className="select-none bg-gradient-to-br from-ink-strong to-sage-bright bg-clip-text font-display text-6xl font-bold text-transparent drop-shadow-[0_0_18px_rgba(124,156,255,0.8)]">
        M
      </span>
    </Html>
  </Float>
);

export default function SkillsOrbitScene({ skills, lite }: Props) {
  const rings = useMemo(() => {
    const list = lite ? skills.slice(0, 10) : skills.slice(0, 21);
    const out: ISkill[][] = RINGS.map(() => []);
    list.forEach((s, i) => out[i % RINGS.length].push(s));
    return out;
  }, [skills, lite]);

  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 2]}
      camera={{ position: [0, 1.2, 9.5], fov: 45 }}
      gl={{ antialias: !lite, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 6]} intensity={60} color="#A5B8FF" />
      <pointLight position={[-5, -3, -2]} intensity={40} color="#C4A5FF" />
      <Rig>
        <Core lite={lite} />
        {RINGS.map((r, i) =>
          rings[i].length ? (
            <Ring
              key={i}
              skills={rings[i]}
              radius={r.radius}
              tilt={r.tilt}
              speed={r.speed}
            />
          ) : null,
        )}
      </Rig>
      <Sparkles
        count={lite ? 40 : 110}
        scale={[11, 7, 6]}
        size={2.2}
        speed={0.35}
        color="#A5B8FF"
      />
    </Canvas>
  );
}
