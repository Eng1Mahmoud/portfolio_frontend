"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { motion } from "framer-motion";
import { RevealText } from "@/components/general/RevealText";

interface TitleProps {
  title: string;
  /** Short line under the heading — what this page actually holds. */
  eyebrow?: string;
  /** How many items are on the page. Shown only when the page has a count. */
  count?: number;
}

/**
 * A rail, a mono eyebrow, and a heading that rises out of a clipping mask.
 * The heading stays one text node — splitting it per character collapses the
 * space in "About Me" to zero width.
 */
export const Title = ({ title, eyebrow, count }: TitleProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mb-10 pl-6 sm:pl-10">
      <motion.span
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-sage via-parchment/12 to-transparent"
      />

      {(eyebrow || count !== undefined) && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-3 grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 sm:flex font-mono text-[11px] uppercase tracking-[0.28em]"
        >
          {eyebrow && <p className="text-sage">{eyebrow}</p>}
          {count !== undefined && (
            <>
              <span aria-hidden="true" className="h-px w-6 bg-parchment/15" />
              <span className="tracking-[0.18em] text-ink-muted">
                {String(count).padStart(2, "0")}
              </span>
            </>
          )}
        </motion.div>
      )}

      <RevealText
        as="h2"
        text={title}
        trigger="scroll"
        delay={0.06}
        className="display-title block text-3xl sm:text-4xl leading-[1.05] text-ink-strong"
      />
    </div>
  );
};
