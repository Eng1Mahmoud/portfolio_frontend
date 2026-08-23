"use client";

import { motion } from "framer-motion";

/**
 * A category heading whose rule draws out to fill the row as the group
 * arrives, so it reads as opening the section rather than sitting above it.
 */
export const SkillGroupHeading = ({
  category,
  count,
}: {
  category: string;
  count: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px" }}
      className="mb-5 flex items-center gap-4"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[11px] uppercase tracking-[0.28em] text-sage"
      >
        {category}
      </motion.h2>

      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="font-mono text-[11px] text-ink-muted"
      >
        {count}
      </motion.span>

      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1 },
        }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px flex-1 bg-gradient-to-r from-sage/40 to-parchment/10"
      />
    </motion.div>
  );
};
