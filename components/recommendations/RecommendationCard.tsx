"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { useTilt } from "@/hooks/use-tilt";
import { IRecommendation } from "@/types/general";
import {
  RecommendationModal,
  type Origin,
} from "@/components/recommendations/RecommendationModal";

/** "2026-01-26" → "Jan 2026". Falls back to the raw string if it is not a date. */
const formatDate = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

/** The initials stand in when a recommender has no avatar on file. */
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const RecommendationCard = ({
  recommendation,
  index = 0,
}: {
  recommendation: IRecommendation;
  index?: number;
}) => {
  const { ref, engaged, reduceMotion, handlers, sx, sy, rotateX, rotateY } =
    useTilt({ range: 6 });

  const [open, setOpen] = useState(false);
  // Where the dialog should appear to come from, captured at the moment of the
  // click — the card is still tilting under the pointer, so reading it later
  // would give the wrong point.
  const [origin, setOrigin] = useState<Origin | null>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  // Most quotes fit inside the clamp, and a "Read more" on a card that hides
  // nothing is just noise — so the button appears only once the text really
  // overflows. Which quotes overflow changes with the column count, hence the
  // observer rather than a one-off measurement.
  const [clipped, setClipped] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    // +1 absorbs sub-pixel rounding, which otherwise reports a false overflow.
    const measure = () => setClipped(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [recommendation.text]);

  const openFull = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setOpen(true);
  };

  const glowX = useTransform(sx, [-0.5, 0.5], ["10%", "90%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["10%", "90%"]);
  const glow = useMotionTemplate`radial-gradient(22rem circle at ${glowX} ${glowY}, rgba(157,194,166,0.14), transparent 70%)`;

  const written = formatDate(recommendation.date);

  return (
    <div className="pin-stage h-full">
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{
          duration: 0.5,
          // Capped so a long list does not leave the last card waiting.
          delay: Math.min(index, 7) * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        {...handlers}
        style={{ rotateX, rotateY }}
        className={`pin-card group relative flex h-full flex-col rounded-2xl border p-6 shadow-pinned transition-colors duration-300 md:p-7 ${
          engaged
            ? "border-sage/40 bg-parchment/[0.05]"
            : "border-parchment/10 bg-surface-panel"
        }`}
      >
        <motion.span
          aria-hidden="true"
          style={{ backgroundImage: reduceMotion ? undefined : glow }}
          animate={{ opacity: engaged ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />

        <div className="relative z-10 flex h-full flex-col">
          <FaQuoteLeft
            aria-hidden="true"
            className="mb-4 text-lg text-sage/60 transition-colors duration-300 group-hover:text-sage"
          />

          {/* Clamped so the row is sized by a typical short quote rather than
              by the single longest one — without it, one eight-line
              recommendation padded every other card with dead space. */}
          <blockquote
            ref={quoteRef}
            className="line-clamp-6 whitespace-pre-line text-sm leading-relaxed text-ink-body md:text-base"
          >
            {recommendation.text}
          </blockquote>

          {/* mt-auto takes over the job `flex-1` used to do on the quote:
              it pushes everything below to a shared baseline across the row,
              while the quote itself stays exactly as tall as its clamp. */}
          <div className="mt-auto">
            {clipped && (
              <button
                type="button"
                onClick={openFull}
                aria-label={`Read the full recommendation from ${recommendation.name}`}
                className="mt-3 flex w-fit items-center gap-1.5 rounded text-sm text-sage transition-colors hover:text-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                Read more
                <FaChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
          </div>

          <footer className="mt-6 flex items-center gap-3 border-t border-parchment/10 pt-5">
            {recommendation.avatar ? (
              <Image
                src={recommendation.avatar}
                alt={recommendation.name}
                width={96}
                height={96}
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-parchment/10 transition-all duration-300 group-hover:ring-sage/40"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-parchment/[0.06] font-mono text-xs tracking-wider text-sage ring-1 ring-parchment/10"
              >
                {initials(recommendation.name)}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-strong">
                {recommendation.name}
              </p>
              <p className="truncate text-xs text-ink-muted">
                {recommendation.role}
                {recommendation.company ? ` · ${recommendation.company}` : ""}
              </p>
            </div>

            {recommendation.linkedinUrl && (
              <a
                href={recommendation.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${recommendation.name} on LinkedIn`}
                className="shrink-0 rounded-md p-1.5 text-ink-muted transition-colors hover:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                <FaLinkedin />
              </a>
            )}
          </footer>

          <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            <span className="rounded-md border border-parchment/10 bg-parchment/[0.04] px-2 py-1 text-sage">
              {recommendation.relation}
            </span>
            {written && <span>{written}</span>}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <RecommendationModal
            recommendation={recommendation}
            written={written}
            origin={origin}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
