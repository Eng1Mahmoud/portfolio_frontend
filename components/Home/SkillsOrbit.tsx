"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ISkill } from "@/types/general";

/** Static fallback: shown while the 3D chunk loads and when WebGL is missing. */
const StaticSkills = ({ skills }: { skills: ISkill[] }) => (
  <div className="relative flex h-full w-full items-center justify-center">
    <div className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-sage to-wheat-deep opacity-70 blur-2xl" />
    <div className="relative grid grid-cols-4 gap-3">
      {skills.slice(0, 12).map((s) => (
        <div
          key={s._id ?? s.name}
          title={s.name}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-parchment/15 bg-surface-panel/80 p-2.5 backdrop-blur"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.imageUrl} alt={s.name} className="h-full w-full object-contain" />
        </div>
      ))}
    </div>
  </div>
);

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
export const SkillsOrbit = ({ skills }: { skills: ISkill[] }) => {
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLite(window.innerWidth < 768);
    setMode(!reduce && hasWebGL() ? "3d" : "static");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-square w-full max-w-[640px] cursor-grab active:cursor-grabbing"
      aria-label="Skills I work with"
      role="img"
    >
      {mode === "3d" ? (
        <Scene skills={skills} lite={lite} />
      ) : mode === "static" ? (
        <StaticSkills skills={skills} />
      ) : null}
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
        drag to spin
      </p>
    </motion.div>
  );
};
