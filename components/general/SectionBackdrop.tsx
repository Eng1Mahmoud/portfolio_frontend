"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * One quiet layer behind every section: a faint blueprint grid, a soft light
 * that settles on the section you are reading, and a vignette for depth.
 *
 * The page scrolls in `#page-scroll`, not in the window, so the active section
 * is read from that element. People who ask their device to reduce motion get
 * the same backdrop with the light parked where it starts.
 */
export const SectionBackdrop = () => {
  const reduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const scroller = document.getElementById("page-scroll");
    if (!layer || !scroller || reduceMotion) return;

    const sections = Array.from(
      scroller.querySelectorAll<HTMLElement>(".portfolio-section"),
    );
    if (!sections.length) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const covers = (box: DOMRect) => box.top <= mid && box.bottom >= mid;
      const center = (box: DOMRect) => box.top + box.height / 2;

      let target = sections.find((section) => covers(section.getBoundingClientRect()));
      if (!target) {
        let closest = Number.POSITIVE_INFINITY;
        for (const section of sections) {
          const box = section.getBoundingClientRect();
          if (box.bottom < 0 || box.top > window.innerHeight) continue;
          const distance = Math.abs(center(box) - mid);
          if (distance < closest) {
            closest = distance;
            target = section;
          }
        }
      }
      if (!target) return;

      const box = target.getBoundingClientRect();
      const y = Math.min(Math.max(center(box), 120), window.innerHeight - 100);
      layer.style.setProperty("--lit-y", `${Math.round(y)}px`);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
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
      <div className="section-backdrop-light" />
      <div className="section-backdrop-vignette" />
    </div>
  );
};
