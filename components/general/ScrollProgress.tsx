"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePageScrollContainer } from "@/hooks/use-page-scroll";

/** A thin gradient bar at the very top that fills as the page scrolls. */
export const ScrollProgress = () => {
  const container = usePageScrollContainer();
  const { scrollYProgress } = useScroll({ container });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[1100] h-[3px] bg-gradient-to-r from-sage via-wheat to-sage-bright shadow-[0_0_12px_rgba(124,156,255,0.7)]"
    />
  );
};
