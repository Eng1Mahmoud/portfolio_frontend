"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ISkill } from "@/types/general";
import { createFloatingPositions, getOrbitLayout, updateFloatingPositions } from "./orbit-layout";

/** Static fallback: shown while the 3D chunk loads and when WebGL is missing. */
const StaticSkills = ({ skills }: { skills: ISkill[] }) => {
  const layout = getOrbitLayout(skills.length);
  const positions = createFloatingPositions(skills.length);
  updateFloatingPositions(layout, positions, 0);
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {layout.slots.map(slot => {
        const skill = skills[slot.index];
        const position = positions[slot.index];
        return <div key={skill._id ?? `${skill.name}-${slot.index}`} title={skill.name} className="static-orbit-badge" style={{ width: `${layout.badgeSize * 100}%`, left: `${50 + position.x * 100}%`, top: `${50 - position.y * 100}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={skill.imageUrl} alt={skill.name} className="h-full w-full object-contain" />
        </div>;
      })}
    </div>
  );
};

const Scene = dynamic(() => import("./SkillsOrbitScene"), {
  ssr: false,
  loading: () => null,
});

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * The home page's 3D object: real skills (from getAllSkills) orbiting a
 * glowing core. Client-only; phones get a lighter scene.
 */
export const SkillsOrbit = ({ skills, portrait, name }: { skills: ISkill[]; portrait?: string; name: string }) => {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () => setLite(mobile.matches);
    update();
    mobile.addEventListener("change", update);
    setMode(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && hasWebGL() ? "3d" : "static");
    return () => mobile.removeEventListener("change", update);
  }, []);

  const layout = getOrbitLayout(skills.length);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="skills-orbit relative aspect-square min-w-0 w-full cursor-grab active:cursor-grabbing"
      aria-label={`${name}: ${skills.map(skill => skill.name).join(", ")}`}
      role="img"
    >
      {mode === "3d" ? (
        <>
          <div className={`absolute inset-0 ${reduceMotion ? "invisible" : ""}`} aria-hidden={reduceMotion}>
            <Scene skills={skills} lite={lite} paused={reduceMotion} />
          </div>
          {reduceMotion && <StaticSkills skills={skills} />}
        </>
      ) : mode === "static" ? (
        <StaticSkills skills={skills} />
      ) : null}
      {portrait && (
        <div style={{ width: `${layout.portraitSize * 100}%` }} className="hero-orbit-portrait pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-sage/60 bg-surface-panel shadow-accent">
          <Image src={portrait} alt={name} fill priority unoptimized sizes="(max-width: 767px) 103px, 173px" className="object-cover" />
        </div>
      )}
    </motion.div>
  );
};
