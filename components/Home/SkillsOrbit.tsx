"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  afterFirstInteraction,
  hasInteracted,
  serverHasInteracted,
} from "@/utiles/first-interaction";
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
            key={skill.id ?? `${skill.name}-${index}`}
            title={skill.name}
            className="static-orbit-badge box-border! aspect-square! grid! place-items-center! [padding:1.3%]! [border-radius:8px]! [border:var(--badge-border)]! [background:var(--badge-background)]! [box-shadow:var(--badge-shadow)]! [backdrop-filter:blur(10px)]! absolute! [transform:translate(-50%,_-50%)]!"
            style={{
              width: `${layout.badgeSize * 100}%`,
              left: `${50 + position.x * 100}%`,
              top: `${50 - position.y * 100}%`,
              opacity: 0.45 + 0.55 * front,
            }}
          >
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              width={64}
              height={64}
              sizes="64px"
              fetchPriority="low"
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
  const interacted = useSyncExternalStore(
    afterFirstInteraction,
    hasInteracted,
    serverHasInteracted,
  );
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);
  const [mode, setMode] = useState<"3d" | "static">("static");
  const [lite, setLite] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Stop the 3D loop while the globe is scrolled out of view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setOnScreen(true);
      return;
    }
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
    return () => mobile.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    // Do not download or initialize the scene until it can actually be seen.
    // Keep an already-mounted scene so returning to it preserves its state.
    if (
      mode === "3d" ||
      !interacted ||
      !onScreen ||
      !pageVisible ||
      reduceMotion
    )
      return;
    let idleId: number | undefined;
    let timer: number | undefined;
    const activate = () => {
      if (!document.hidden) setMode(hasWebGL() ? "3d" : "static");
    };
    const start = () => {
      if (typeof window.requestIdleCallback === "function")
        idleId = window.requestIdleCallback(activate, { timeout: 2500 });
      else timer = window.setTimeout(activate, 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [mode, interacted, onScreen, pageVisible, reduceMotion]);

  const layout = getSphereLayout(skills.length);

  return (
    <motion.div
      ref={rootRef}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="skills-orbit max-w-120! overflow-hidden! isolate! md:max-w-160! max-md:[@media(max-height:700px)]:max-w-95! relative aspect-square min-w-0 w-full cursor-grab active:cursor-grabbing"
      aria-label={`${name}: ${skills.map((skill) => skill.name).join(", ")}`}
      role="img"
    >
      {mode === "3d" ? (
        <>
          <div
            className={`absolute inset-0 ${reduceMotion || !sceneReady ? "invisible" : ""}`}
            aria-hidden={reduceMotion || !sceneReady}
          >
            <Scene
              onReady={onSceneReady}
              skills={skills}
              lite={lite}
              paused={reduceMotion || !onScreen || !pageVisible}
            />
          </div>
          {(reduceMotion || !sceneReady) && <StaticSkills skills={skills} />}
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
            sizes="(max-width: 767px) 154px, 205px"
            className="object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};
