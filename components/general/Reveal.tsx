"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
  trigger = "scroll",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  trigger?: "mount" | "scroll";
}) => {
  const reduceMotion = useReducedMotion();
  const activate = trigger === "mount" ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.08 } };
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      {...activate}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
