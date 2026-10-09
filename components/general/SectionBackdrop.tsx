"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * One quiet layer behind every section: a faint blueprint grid, two slowly
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

export const SectionBackdrop = () => {
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
      <div className="section-backdrop-grid" />
      <div className="section-backdrop-drift section-backdrop-drift--one" />
      <div className="section-backdrop-drift section-backdrop-drift--two" />
      <div className="section-backdrop-light" />
      <div className="section-backdrop-grain" />
      <div className="section-backdrop-vignette" />
    </div>
  );
};
