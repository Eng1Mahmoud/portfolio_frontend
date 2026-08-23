"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { usePageScrollContainer } from "@/hooks/use-page-scroll";

/** Where the rail runs. Shared so the line and the dots cannot drift apart. */
const RAIL_X = "absolute left-[10px] top-0 h-full -translate-x-1/2";

/*
  Reveal margins here are vertical-only ("-Npx 0px"). A one-value rootMargin
  insets all four sides, which at 390px narrowed the trigger box enough that
  the 16px node near the left edge never intersected and stayed invisible.
*/

/**
 * A dim track with a lit segment that fills as you scroll, and a node that
 * ignites as each entry arrives.
 */
export const Timeline = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const containerRef = usePageScrollContainer();

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    // Completes as the last entry is read, not after it has scrolled off.
    offset: ["start 0.75", "end 0.5"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const glowY = useTransform(fill, (value) => `${value * 100}%`);

  return (
    <div ref={ref} className="relative pl-8 md:pl-12">
      {/*
        A plain wrapper does the centring and the animated part sits inside it:
        framer-motion writes `transform` inline, which outranks Tailwind's
        `-translate-x-1/2` and would leave the element half its width off-line.
      */}

      {/* Track. */}
      <span aria-hidden="true" className={`${RAIL_X} w-px bg-parchment/10`} />

      {/* Lit segment. */}
      <span aria-hidden="true" className={`${RAIL_X} w-px`}>
        <motion.span
          style={{ scaleY: fill, transformOrigin: "top" }}
          className="block h-full w-full bg-gradient-to-b from-sage to-sage/40"
        />
      </span>

      {/* The reading head, riding the end of the lit segment. */}
      <span aria-hidden="true" className={`${RAIL_X} w-px`}>
        <motion.span
          style={{ top: glowY }}
          className="absolute h-16 w-px bg-gradient-to-b from-sage to-transparent blur-[2px]"
        />
      </span>

      {children}
    </div>
  );
};

/** One entry on the rail. Owns its node so the two cannot drift out of step. */
export const TimelineEntry = ({
  index = 0,
  children,
}: {
  index?: number;
  children: ReactNode;
}) => {
  return (
    <motion.div
      className="relative mb-12 flex flex-col"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index, 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/*
        Outer span positions, inner span animates — same reason as the rail.
        The -22 / -38 offsets cancel the container's 32px / 48px left padding
        so the centre lands on RAIL_X at both widths.
      */}
      <span
        aria-hidden="true"
        className="absolute -left-[22px] top-1 z-10 h-4 w-4 -translate-x-1/2 md:-left-[38px] md:h-5 md:w-5"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{
            duration: 0.4,
            delay: Math.min(index, 4) * 0.08 + 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="block h-full w-full rounded-full border-2 border-sage bg-surface-well shadow-[0_0_14px_rgba(157,194,166,0.45)]"
        />
      </span>
      {children}
    </motion.div>
  );
};
