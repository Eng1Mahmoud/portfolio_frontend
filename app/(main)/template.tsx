"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Page transition. A `template` rather than a `layout` because Next remounts a
 * template on every navigation — a layout would play this once per session.
 *
 * One move only: every page underneath already runs its own arrival sequence.
 */
export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // The page scrolls in a container, not the window, so Next's scroll
  // restoration never sees it — navigating from the bottom of one page left
  // the next one already scrolled down.
  useEffect(() => {
    document.getElementById("page-scroll")?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
