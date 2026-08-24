"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FaTimes, FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IRecommendation } from "@/types/general";

/** Where on screen the dialog should appear to come from. */
export interface Origin {
  x: number;
  y: number;
}

interface RecommendationModalProps {
  recommendation: IRecommendation;
  /** Formatted date from the card, so both surfaces read the same. */
  written?: string | null;
  /** Centre of the card that opened this, in viewport coordinates. */
  origin?: Origin | null;
  onClose: () => void;
}

/** The initials stand in when a recommender has no avatar on file. */
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const RecommendationModal = ({
  recommendation,
  written,
  origin,
  onClose,
}: RecommendationModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // The card tilts on a 3D transform, and a transformed ancestor becomes the
  // containing block for `position: fixed` — so the backdrop would pin to the
  // card instead of the viewport. The portal takes it out of that subtree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Escape to close, and lock the page behind the dialog so the background
  // does not scroll while the quote is being read.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // The panel is centred, so its resting centre is the viewport centre — the
  // offset to the card is just the difference between the two, and no
  // measurement of the panel itself is needed.
  const from =
    origin && !reduceMotion
      ? {
          x: origin.x - window.innerWidth / 2,
          y: origin.y - window.innerHeight / 2,
          scale: 0.3,
          opacity: 0,
        }
      : { scale: 0.95, opacity: 0 };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-surface-well/85 p-4 backdrop-blur-sm"
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Recommendation from ${recommendation.name}`}
        onClick={(event) => event.stopPropagation()}
        initial={from}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={from}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
          opacity: { duration: 0.22 },
        }}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-parchment/10 bg-surface-card outline-none"
      >
        {/* Header stays put so the close button is always reachable while
            scrolling a long quote. */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-parchment/10 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            {recommendation.avatar ? (
              <Image
                src={recommendation.avatar}
                alt={recommendation.name}
                width={96}
                height={96}
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-parchment/10"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-parchment/[0.06] font-mono text-xs tracking-wider text-sage ring-1 ring-parchment/10"
              >
                {initials(recommendation.name)}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-ink-strong">
                {recommendation.name}
              </h3>
              <p className="truncate text-xs text-ink-muted">
                {recommendation.role}
                {recommendation.company ? ` · ${recommendation.company}` : ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close recommendation"
            className="shrink-0 rounded-md p-1 text-ink-muted transition-colors hover:bg-parchment/10 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <FaTimes size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Only this region scrolls. */}
        <div className="scrollBar min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <FaQuoteLeft
            aria-hidden="true"
            className="mb-4 text-lg text-sage/60"
          />
          <blockquote className="whitespace-pre-line text-sm leading-[1.75] text-ink-body">
            {recommendation.text}
          </blockquote>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-parchment/10 px-6 py-4">
          <span className="rounded-md border border-parchment/10 bg-parchment/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sage">
            {recommendation.relation}
          </span>
          {written && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {written}
            </span>
          )}
          {recommendation.linkedinUrl && (
            <a
              href={recommendation.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-auto flex items-center gap-2 rounded-full border border-parchment/15 px-4 py-2 text-sm text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};
