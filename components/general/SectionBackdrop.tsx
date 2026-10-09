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
  recommendations: [
    "var(--portfolio-support-deep)",
    "var(--portfolio-accent-dim)",
  ],
  "contact-us": ["var(--portfolio-accent-bright)", "var(--portfolio-support)"],
};

type Star = { x: number; y: number; r: number; hub: boolean; d: number };

/** Deterministic star map so server and client render identical markup. */
const buildStarMap = () => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const stars: Star[] = [];
  const lines: [Star, Star][] = [];
  const hubs = [
    [220, 230],
    [520, 600],
    [880, 300],
    [1300, 180],
    [1180, 720],
    [260, 820],
  ];
  for (const [cx, cy] of hubs) {
    const group: Star[] = [];
    for (let i = 0; i < 6; i++) {
      const star = {
        x: cx + (rand() - 0.5) * 300,
        y: cy + (rand() - 0.5) * 240,
        r: 1.4 + rand() * 1.6,
        hub: i === 0,
        d: rand() * 6,
      };
      group.push(star);
      stars.push(star);
    }
    for (let i = 1; i < group.length; i++) lines.push([group[i - 1], group[i]]);
  }
  for (let i = 0; i < 140; i++)
    stars.push({
      x: rand() * 1600,
      y: rand() * 1000,
      r: 0.4 + rand() * 0.9,
      hub: false,
      d: rand() * 6,
    });
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
        if (box.top <= mid && box.bottom >= mid) {
          best = section;
          break;
        }
        const d = Math.abs(box.top + box.height / 2 - mid);
        if (d < closest) {
          closest = d;
          best = section;
        }
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
      layer.style.setProperty(
        "--star-shift",
        `${(-Math.min(scroller.scrollTop * 0.03, 140)).toFixed(1)}px`,
      );
      frame =
        Math.abs(target - current) > 0.4 ? requestAnimationFrame(tick) : 0;
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
    <div
      ref={layerRef}
      aria-hidden="true"
      className="section-backdrop fixed! [inset:0]! [z-index:0]! pointer-events-none! overflow-hidden! [transition:--lit-a_1200ms_ease,_--lit-b_1200ms_ease]! motion-reduce:[transition:none]!"
    >
      <svg
        className="section-backdrop-stars absolute! [inset:-2%_-2%_-16%]! [width:104%]! [height:118%]! [transform:translate3d(0,_var(--star-shift,_0px),_0)]! [will-change:transform]! [mask-image:var(--stars-mask)]! [&_.star-lines_line]:[stroke:var(--constellation-stroke)]! [&_.star-lines_line]:[stroke-width:0.7]! [&_.star]:[fill:var(--star-fill)]! [&_.star]:[opacity:0.55] [&_.star]:[animation:star-twinkle_6s_ease-in-out_infinite] [&_.star--hub]:fill-sage-bright! [&_.star--hub]:[opacity:0.9] [&_.star--hub]:[filter:var(--star-glow)]! motion-reduce:[&_.star]:[animation:none]!"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
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
      <div className="section-backdrop-drift absolute! [width:min(760px,_120vw)]! aspect-square! [border-radius:50%]! [filter:blur(60px)]! [opacity:0.26]! [will-change:transform]! motion-reduce:[animation:none]! section-backdrop-drift--one [left:-18%]! [top:-12%]! [background:var(--drift-support)]! [animation:backdrop-drift-one_38s_ease-in-out_infinite_alternate]!" />
      <div className="section-backdrop-drift absolute! [width:min(760px,_120vw)]! aspect-square! [border-radius:50%]! [filter:blur(60px)]! [opacity:0.26]! [will-change:transform]! motion-reduce:[animation:none]! section-backdrop-drift--two [right:-20%]! [bottom:-18%]! [background:var(--drift-accent)]! [animation:backdrop-drift-two_46s_ease-in-out_infinite_alternate]!" />
      <div className="section-backdrop-light absolute! [left:50%]! [top:0]! [width:min(1120px,_170vw)]! [height:min(720px,_88vh)]! [transform:translate3d(-50%,_calc(var(--lit-y,_42vh)_-_50%),_0)]! [background:var(--reading-light)]! [opacity:0.42]! [will-change:transform]!" />
      <div className="section-backdrop-grain absolute! [inset:0]! [opacity:0.05]! [mix-blend-mode:overlay]! [background-image:var(--grain-image)]!" />
      <div className="section-backdrop-vignette absolute! [inset:0]! [background:var(--vignette)]!" />
    </div>
  );
};
