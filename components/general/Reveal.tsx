"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Entry animation for a block inside a server component. It exists so pages
 * can join the load sequence without becoming client components themselves —
 * `children` is passed through as a prop, so the page stays on the server.
 *
 * `delay` is expressed in the same beats as the home hero, so a block added
 * here lands in rhythm with the heading above it rather than on its own clock.
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
