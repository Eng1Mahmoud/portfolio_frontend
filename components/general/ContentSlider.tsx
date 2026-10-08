"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/** Native scroll snapping retains touch, keyboard and each card's own actions. */
export const ContentSlider = ({ children, label, variant = "quotes" }: { children: ReactNode; label: string; variant?: "showcase" | "quotes" }) => {
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [position, setPosition] = useState({ first: 1, last: 1, start: true, end: false });
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const bounds = el.getBoundingClientRect();
      const visible = cards.map((card, i) => ({ card, i })).filter(({ card }) => { const rect = card.getBoundingClientRect(); return rect.right > bounds.left + 24 && rect.left < bounds.right - 24; });
      setPosition({ first: (visible[0]?.i ?? 0) + 1, last: (visible.at(-1)?.i ?? 0) + 1, start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => { el.removeEventListener("scroll", measure); observer.disconnect(); };
  }, [items.length]);
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const width = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth;
    el.scrollBy({ left: direction * (width + 32), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  if (!items.length) return <p className="text-ink-muted">No {label.toLowerCase()} to display yet.</p>;
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-3 flex items-center justify-end gap-3">
        <span aria-live="polite" className="mr-2 font-mono text-xs text-ink-muted">{position.first}–{position.last} / {items.length}</span>
        {[-1, 1].map((direction) => <button key={direction} type="button" aria-label={`${direction < 0 ? "Previous" : "Next"} ${label.toLowerCase()}`} title={`${direction < 0 ? "Previous" : "Next"} ${label.toLowerCase()}`} aria-controls={`${label.toLowerCase()}-slider`} disabled={direction < 0 ? position.start : position.end} onClick={() => move(direction)} className="slider-arrow">{direction < 0 ? <FaArrowLeft /> : <FaArrowRight />}</button>)}
      </div>
      <div ref={track} id={`${label.toLowerCase()}-slider`} tabIndex={0} className={`content-slider content-slider--${variant}`} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
        {items.map((item, i) => <div key={i} className="slider-item" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>{item}</div>)}
      </div>
    </div>
  );
};
