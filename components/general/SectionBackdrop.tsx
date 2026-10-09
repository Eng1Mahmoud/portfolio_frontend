"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * One quiet layer behind every section: a nebula star map with faint constellations, two slowly
 * drifting glows, a light that glides after the section you are reading and
 * shifts its tint per section, fine grain, and a vignette for depth.
 *
 * The light position is eased every frame (no jumps between sections) and the
 * tint crossfades through registered CSS colour properties. Reduced-motion
 * visitors get the same backdrop with everything parked.
 */
const TINTS: Record<string, [string, string]> = {
  home: ["var(--portfolio-accent)", "var(--portfolio-support)"],
  skills: ["var(--portfolio-support)", "var(--portfolio-accent)"],
  projects: ["var(--portfolio-accent-dim)", "var(--portfolio-accent-bright)"],
  experience: ["var(--portfolio-accent)", "var(--portfolio-support-deep)"],
  recommendations: ["var(--portfolio-support-deep)", "var(--portfolio-accent-dim)"],
  "contact-us": ["var(--portfolio-accent-bright)", "var(--portfolio-support)"],
};

type Star = { x: number; y: number; r: number; hub: boolean; d: number };

/** Deterministic star map so server and client render identical markup. */
const buildStarMap = () => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const stars: Star[] = [];
  const lines: [Star, Star][] = [];
  const hubs = [[220, 230], [520, 600], [880, 300], [1300, 180], [1180, 720], [260, 820]];
  for (const [cx, cy] of hubs) {
    const group: Star[] = [];
    for (let i = 0; i < 6; i++) {
      const star = { x: cx + (rand() - 0.5) * 300, y: cy + (rand() - 0.5) * 240, r: 1.4 + rand() * 1.6, hub: i === 0, d: rand() * 6 };
      group.push(star);
      stars.push(star);
    }
    for (let i = 1; i < group.length; i++) lines.push([group[i - 1], group[i]]);
  }
  for (let i = 0; i < 140; i++) stars.push({ x: rand() * 1600, y: rand() * 1000, r: 0.4 + rand() * 0.9, hub: false, d: rand() * 6 });
  return { stars, lines };
};

export const SectionBackdrop = () => {
  const map = useMemo(buildStarMap, []);
  const reduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const scroller = document.getElementById("page-scroll");
    if (!layer || !scroller || reduceMotion) return;

    const sections = Array.from(
      scroller.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (!sections.length) return;

    let current = window.innerHeight * 0.42;
    let target = current;
    let activeId = "";
    let frame = 0;

    const measure = () => {
      const mid = window.innerHeight / 2;
      let best: HTMLElement | undefined;
      let closest = Number.POSITIVE_INFINITY;
      for (const section of sections) {
        const box = section.getBoundingClientRect();
        if (box.top <= mid && box.bottom >= mid) { best = section; break; }
        const d = Math.abs(box.top + box.height / 2 - mid);
        if (d < closest) { closest = d; best = section; }
      }
      if (!best) return;
      const box = best.getBoundingClientRect();
      // Follow the reading line inside the section, bounded to its box.
      const y = Math.min(Math.max(mid, box.top + 160), box.bottom - 160);
      target = Math.min(Math.max(y, 120), window.innerHeight - 100);
      if (best.id !== activeId) {
        activeId = best.id;
        const tint = TINTS[activeId] ?? TINTS.home;
        layer.style.setProperty("--lit-a", tint[0]);
        layer.style.setProperty("--lit-b", tint[1]);
      }
    };

    const tick = () => {
      current += (target - current) * 0.08;
      layer.style.setProperty("--lit-y", `${current.toFixed(1)}px`);
      layer.style.setProperty("--star-shift", `${(-Math.min(scroller.scrollTop * 0.03, 140)).toFixed(1)}px`);
      frame = Math.abs(target - current) > 0.4 ? requestAnimationFrame(tick) : 0;
    };
    const queue = () => {
      measure();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    queue();
    scroller.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [reduceMotion]);

  return (
    <div ref={layerRef} aria-hidden="true" className="section-backdrop">
      <svg className="section-backdrop-stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <g className="star-lines">
          {map.lines.map(([a, b], i) => (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          ))}
        </g>
        {map.stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.r}
            className={star.hub ? "star star--hub" : "star"}
            style={{ animationDelay: `${star.d.toFixed(2)}s` }}
          />
        ))}
      </svg>
      <div className="section-backdrop-drift section-backdrop-drift--one" />
      <div className="section-backdrop-drift section-backdrop-drift--two" />
      <div className="section-backdrop-light" />
      <div className="section-backdrop-grain" />
      <div className="section-backdrop-vignette" />
    </div>
  );
};
