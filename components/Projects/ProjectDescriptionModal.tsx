"use client";
import { motion } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ProjectDescriptionModalProps {
  title: string;
  description: string;
  technologies?: string[];
  githubLink?: string;
  demoLink?: string;
  onClose: () => void;
}

export const ProjectDescriptionModal = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  onClose,
}: ProjectDescriptionModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  // The card that opens this dialog now sits inside a 3D transform (the
  // pinboard tilt). A transformed ancestor becomes the containing block for
  // `position: fixed`, so the backdrop would be pinned to the card instead of
  // the viewport. Rendering through a portal takes the dialog out of that
  // subtree entirely.
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

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050a14]/85 p-4 backdrop-blur-sm"
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // Stop clicks inside the panel from reaching the backdrop's close.
        onClick={(event) => event.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-surface-card outline-none"
      >
        {/* Header stays put so the close button is always reachable while
            scrolling a long description. */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
          <h3 className="text-xl font-semibold text-ink-strong md:text-2xl">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 rounded-md p-1 text-ink-muted transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
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
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-body"
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
          <div className="flex shrink-0 flex-wrap gap-3 border-t border-white/10 px-6 py-4">
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-ink-body transition-colors hover:border-cyan-400/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
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
                className="flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-[#06121f] transition-colors hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
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
