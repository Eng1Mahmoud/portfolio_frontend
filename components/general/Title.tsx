"use client";

import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  /** Short line under the heading — what this page actually holds. */
  eyebrow?: string;
  /** How many items are on the page. Shown only when the page has a count. */
  count?: number;
}

/**
 * Page heading, in the home page's language: a cyan-headed hairline rail on
 * the left, a mono eyebrow, and the heading set in the display face.
 *
 * The heading rises out of a clipping mask rather than fading in. It is one
 * text node — splitting it per character puts eight elements inside an <h1>
 * and collapses the space in "About Me" to zero width.
 */
export const Title = ({ title, eyebrow, count }: TitleProps) => {
  return (
    <div className="relative mb-10 pl-6 sm:pl-10">
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-white/12 to-transparent"
      />

      {(eyebrow || count !== undefined) && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em]"
        >
          {eyebrow && <p className="text-cyan-300">{eyebrow}</p>}
          {count !== undefined && (
            <>
              <span aria-hidden="true" className="h-px w-6 bg-white/15" />
              <span className="tracking-[0.18em] text-ink-muted">
                {String(count).padStart(2, "0")}
              </span>
            </>
          )}
        </motion.div>
      )}

      {/* The mask. overflow-hidden on a wrapper with a little bottom padding,
          so descenders in "Projects" are not shaved off once it settles. */}
      <span className="block overflow-hidden pb-[0.12em]">
        <motion.h1
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="display-title text-[clamp(1.9rem,5vw,2.9rem)] leading-[1.05] text-ink-strong"
        >
          {title}
        </motion.h1>
      </span>
    </div>
  );
};
