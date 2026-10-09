import type { MouseEvent } from "react";

/** Moves the card's spotlight to the pointer through two CSS variables. */
export const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/**
 * A soft accent glow that follows the pointer across a glass card. Reads the
 * --mx/--my variables that trackPointer keeps up to date, so the parent card
 * must call trackPointer on mouse move and carry the `group` class. Sits below
 * any `z-10` content and above the card background.
 */
export const Spotlight = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,0%),color-mix(in_oklab,var(--portfolio-accent)_18%,transparent),transparent_70%)] group-hover:opacity-100"
  />
);
