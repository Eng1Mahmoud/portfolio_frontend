"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ISkill } from "@/types/general";
import {
  createFloatingPositions,
  getSphereLayout,
  updateFloatingPositions,
} from "./orbit-layout";

/** Static fallback: shown while the 3D chunk loads and when WebGL is missing. */
const StaticSkills = ({ skills }: { skills: ISkill[] }) => {
  const layout = getSphereLayout(skills.length);
  const positions = createFloatingPositions(skills.length);
  updateFloatingPositions(layout, positions, 0, 0.4, 0.08);
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {positions.map((position, index) => {
        const skill = skills[index];
        if (!skill) return null;
        const front = (position.z / layout.radius + 1) / 2;
        return (
          <div
            key={skill._id ?? `${skill.name}-${index}`}
            title={skill.name}
            className="static-orbit-badge box-border! aspect-square! grid! place-items-center! [padding:1.3%]! [border-radius:8px]! [border:var(--badge-border)]! [background:var(--badge-background)]! [box-shadow:var(--badge-shadow)]! absolute! [transform:translate(-50%,_-50%)]!"
            style={{
              width: `${layout.badgeSize * 100}%`,
              left: `${50 + position.x * 100}%`,
              top: `${50 - position.y * 100}%`,
              opacity: 0.45 + 0.55 * front,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.imageUrl}
              alt={skill.name}
              className="h-full w-full object-contain"
            />
          </div>
        );
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
export const SkillsOrbit = ({
  skills,
  portrait,
  name,
}: {
  skills: ISkill[];
  portrait?: string;
  name: string;
}) => {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [lite, setLite] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Stop the 3D loop while the globe is scrolled out of view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () => setLite(mobile.matches);
    update();
    mobile.addEventListener("change", update);
    const want3d =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      hasWebGL();
    // Show the light static globe first; start WebGL only once the page
    // has loaded and the main thread is idle, so first paint never freezes.
    setMode("static");
    let idleId = 0;
    let timer = 0;
    const start = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      };
      if (w.requestIdleCallback)
        idleId = w.requestIdleCallback(() => setMode("3d"), { timeout: 2500 });
      else timer = window.setTimeout(() => setMode("3d"), 1200);
    };
    // Phones: the 3D engine is costly on slower CPUs, so wait for the first
    // touch/scroll (or a few quiet seconds) before swapping it in.
    const isPhone = mobile.matches;
    const events = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    const scroller = document.getElementById("page-scroll");
    const onFirstInput = () => {
      cleanupInput();
      start();
    };
    const cleanupInput = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstInput));
      scroller?.removeEventListener("scroll", onFirstInput);
    };
    let phoneTimer = 0;
    const armPhone = () => {
      events.forEach((e) =>
        window.addEventListener(e, onFirstInput, { once: true, passive: true }),
      );
      scroller?.addEventListener("scroll", onFirstInput, { once: true, passive: true });
      phoneTimer = window.setTimeout(onFirstInput, 8000);
    };
    const begin = isPhone ? armPhone : start;
    if (want3d) {
      if (document.readyState === "complete") begin();
      else window.addEventListener("load", begin, { once: true });
    }
    return () => {
      mobile.removeEventListener("change", update);
      window.removeEventListener("load", begin);
      cleanupInput();
      if (phoneTimer) clearTimeout(phoneTimer);
      if (idleId) (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const layout = getSphereLayout(skills.length);

  return (
    <motion.div
      ref={rootRef}
      initial={reduceMotion ? false : { scale: 0.97 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="skills-orbit max-w-120! overflow-hidden! isolate! md:max-w-160! max-md:[@media(max-height:700px)]:max-w-95! relative aspect-square min-w-0 w-full cursor-grab active:cursor-grabbing"
      aria-label={`${name}: ${skills.map((skill) => skill.name).join(", ")}`}
      role="img"
    >
      {mode === "3d" ? (
        <>
          <div
            className={`absolute inset-0 ${reduceMotion ? "invisible" : ""}`}
            aria-hidden={reduceMotion}
          >
            <Scene skills={skills} lite={lite} paused={reduceMotion || !onScreen} />
          </div>
          {reduceMotion && <StaticSkills skills={skills} />}
        </>
      ) : mode === "static" ? (
        <StaticSkills skills={skills} />
      ) : null}
      {portrait && (
        <div
          style={{ width: `${layout.portraitSize * 100}%` }}
          className="hero-orbit-portrait [width:32%]! aspect-square! pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-sage/60 bg-surface-panel shadow-accent"
        >
          <Image
            src={portrait}
            alt={name}
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="(max-width: 767px) 160px, 256px"
            className="object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};
