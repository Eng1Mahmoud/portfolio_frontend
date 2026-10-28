"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * The pinboard: project screenshots as prints pinned to a board.
 *
 * With a pointer, each print hangs slightly off square, straightens and lifts
 * toward the cursor, and a wheat sheen rakes across it. Touch uses flat,
 * native-scrolling cards without hidden scroll/spring subscriptions.
 */

/**
 * Deterministic rather than random: a Math.random() angle hydrates to a
 * different value on the client and React discards the whole subtree.
 */
const REST_ANGLES = [-0.6, 0.4, -0.3, 0.5, -0.4, 0.3];

/**
 * Below this the board flattens and the scroll lean takes over. A z-rotated
 * card's bounding box is wider than the card, so at phone widths its corners
 * hit the page's overflow clip.
 */
const FLAT_BELOW = "(max-width: 767px)";

export const PinnedCard = ({
  index = 0,
  children,
  className = "",
}: {
  index?: number;
  children: ReactNode;
  className?: string;
}) => {
  const { ref, engaged, reduceMotion, handlers, rotateX, rotateY } = useTilt({
    range: 3,
  });
  const compact = useMediaQuery(FLAT_BELOW);
  const restAngle = compact ? 0 : REST_ANGLES[index % REST_ANGLES.length];

  return (
    <motion.div
      className={`pin-stage [perspective:1100px]! [perspective-origin:center]! motion-reduce:[perspective:none]! h-full ${className}`}
    >
      <motion.div
        ref={ref}
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }
        }
        // The entry overshoot is a keyframe pair, not a rotation in
        // `initial`: framer-motion snapshots `initial` once on mount, before
        // the media query that flattens the board has resolved, which left
        // off-screen cards holding a desktop tilt at phone widths.
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: reduceMotion ? restAngle : [restAngle * 2.2, restAngle],
        }}
        // Vertical-only margin. A single value insets all four sides, which
        // at 390px narrows the trigger box enough to miss narrow elements
        // near the left edge entirely.
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{
          duration: 0.55,
          delay: Math.min(index, 5) * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
        // On whileHover rather than a second `animate` prop, which would
        // fight the entry transition for control of `rotate`.
        whileHover={
          reduceMotion || compact ? undefined : { rotate: 0, scale: 1.005 }
        }
        {...handlers}
        style={{ rotateX, rotateY }}
        className={`pin-card [transform-style:preserve-3d]! [&:hover_.pin-lift]:[transform:translateZ(34px)]! group/pin relative h-full rounded-2xl transition-shadow duration-300 ${
          engaged ? "shadow-lifted" : "shadow-pinned"
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
