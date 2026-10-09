"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/** Native scroll snapping retains touch, keyboard and each card's own actions. */
export const ContentSlider = ({
  children,
  label,
  variant = "quotes",
}: {
  children: ReactNode;
  label: string;
  variant?: "showcase" | "quotes";
}) => {
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [position, setPosition] = useState({
    first: 1,
    last: 1,
    start: true,
    end: false,
  });
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const bounds = el.getBoundingClientRect();
      const visible = cards
        .map((card, i) => ({ card, i }))
        .filter(({ card }) => {
          const rect = card.getBoundingClientRect();
          return rect.right > bounds.left + 24 && rect.left < bounds.right - 24;
        });
      setPosition({
        first: (visible[0]?.i ?? 0) + 1,
        last: (visible.at(-1)?.i ?? 0) + 1,
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
      });
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [items.length]);
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const width =
      (el.firstElementChild as HTMLElement | null)?.offsetWidth ??
      el.clientWidth;
    el.scrollBy({
      left: direction * (width + 32),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  if (!items.length)
    return (
      <p className="text-ink-muted">No {label.toLowerCase()} to display yet.</p>
    );
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-3 flex items-center justify-end gap-3">
        <span
          aria-live="polite"
          className="mr-2 font-mono text-xs text-ink-muted"
        >
          {position.first}–{position.last} / {items.length}
        </span>
        {[-1, 1].map((direction) => (
          <button
            key={direction}
            type="button"
            aria-label={`${direction < 0 ? "Previous" : "Next"} ${label.toLowerCase()}`}
            title={`${direction < 0 ? "Previous" : "Next"} ${label.toLowerCase()}`}
            aria-controls={`${label.toLowerCase()}-slider`}
            disabled={direction < 0 ? position.start : position.end}
            onClick={() => move(direction)}
            className="slider-arrow inline-flex! [width:42px]! [height:42px]! items-center! justify-center! [border:var(--slider-border)]! [border-radius:50%]! bg-surface-panel! text-ink-strong! [box-shadow:var(--card-shadow)]! [transition:border-color_200ms,_background_200ms]! [&:hover:not(:disabled)]:bg-surface-raised! [&:hover:not(:disabled)]:border-sage! [&:disabled]:[opacity:0.3]! [&:disabled]:[cursor:not-allowed]! [&:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&:focus-visible]:[outline-offset:4px]!"
          >
            {direction < 0 ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        ))}
      </div>
      <div
        ref={track}
        id={`${label.toLowerCase()}-slider`}
        tabIndex={0}
        className={`relative grid grid-flow-col items-stretch overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-5 px-0 py-7 pb-11 mx-0 [scroll-padding-inline:0] [scrollbar-width:thin] [scrollbar-color:var(--portfolio-accent-dim)_transparent] focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 md:gap-8 md:px-5 md:-mx-5 md:[scroll-padding-inline:20px] ${variant === "showcase" ? "auto-cols-[100%] md:auto-cols-[78%] [&_article]:flex md:[&_article]:grid md:[&_article]:grid-cols-[1.15fr_1fr] [&_article>div:first-child]:h-55 md:[&_article>div:first-child]:h-full md:[&_article>div:first-child]:min-h-85 [&_article>div:nth-child(2)]:p-[22px]! md:[&_article>div:nth-child(2)]:p-8! [&_article_h3]:text-2xl! [&_article_p]:line-clamp-4!" : "auto-cols-[100%] md:auto-cols-[calc((100%_-_32px)/2)]"}`}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-0 snap-center snap-always md:snap-start [&>div]:h-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
