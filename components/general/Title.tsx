"use client";

import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  /** Short line under the heading — what this page actually holds. */
  eyebrow?: string;
}

/**
 * Page heading, in the home page's language: a cyan-headed hairline rail on
 * the left, a mono eyebrow, and the heading set in Outfit.
 *
 * The heading is one text node. It used to be split into one <span> per
 * character, which put 8 elements inside an <h1> and left the space in
 * "About Me" as an inline-block span of pure whitespace — a shape CSS
 * collapses to zero width.
 */
export const Title = ({ title, eyebrow }: TitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative mb-10 pl-6 sm:pl-10"
    >
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-white/12 to-transparent"
      />

      {eyebrow && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
      )}

      <h1 className="text-[clamp(1.9rem,5vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em] text-ink-strong">
        {title}
      </h1>
    </motion.div>
  );
};
