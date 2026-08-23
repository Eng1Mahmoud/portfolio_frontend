"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Entry animation for a block inside a server component: `children` passes
 * through as a prop, so the page stays on the server.
 */
export const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
