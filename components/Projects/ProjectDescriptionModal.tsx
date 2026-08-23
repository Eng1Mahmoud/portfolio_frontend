"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Where on screen the dialog should appear to come from. */
export interface Origin {
  x: number;
  y: number;
}

interface ProjectDescriptionModalProps {
  title: string;
  description: string;
  technologies?: string[];
  githubLink?: string;
  demoLink?: string;
  /** Centre of the card that opened this, in viewport coordinates. */
  origin?: Origin | null;
  onClose: () => void;
}

export const ProjectDescriptionModal = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  origin,
  onClose,
}: ProjectDescriptionModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // The card sits inside a 3D transform, and a transformed ancestor becomes
  // the containing block for `position: fixed` — so the backdrop would pin to
  // the card instead of the viewport. The portal takes it out of that subtree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Escape to close, and lock the page behind the dialog so the background
  // does not scroll while the description is being read.
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

  /*
    The dialog grows out of the card that opened it. The panel is centred in
    the viewport, so its resting centre is the viewport centre — which means
    the offset to the card is just the difference between the two, and no
    measurement of the panel itself is needed.

    Done with transforms rather than `layoutId`: the card sits inside a
    perspective context with a 3D transform, and layout projection across that
    and a portal is not something to rely on.
  */
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
        aria-label={title}
        // Stop clicks inside the panel from reaching the backdrop's close.
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
            scrolling a long description. */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-parchment/10 px-6 py-4">
          <h3 className="text-xl font-semibold text-ink-strong md:text-2xl">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 rounded-md p-1 text-ink-muted transition-colors hover:bg-parchment/10 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <FaTimes size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Only this region scrolls. */}
        <div className="scrollBar min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {technologies && technologies.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Built with
              </h4>
              <ul className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-parchment/10 bg-parchment/[0.04] px-3 py-1 text-xs text-ink-body"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="whitespace-pre-wrap text-sm leading-[1.75] text-ink-body">
            {description}
          </p>
        </div>

        {/* Actions stay visible instead of being scrolled past. */}
        {(githubLink || demoLink) && (
          <div className="flex shrink-0 flex-wrap gap-3 border-t border-parchment/10 px-6 py-4">
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-parchment/15 px-4 py-2 text-sm text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </Link>
            )}
            {demoLink && (
              <Link
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-sage px-4 py-2 text-sm font-medium text-surface-base transition-colors hover:bg-sage-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                <FaExternalLinkAlt aria-hidden="true" />
                Live
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
};
