"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePageScrollContainer } from "@/hooks/use-page-scroll";

/**
 * The pinboard: project screenshots as prints pinned to a board.
 *
 * With a pointer, each print hangs slightly off square, straightens and lifts
 * toward the cursor, and a wheat sheen rakes across it. On touch there is no
 * cursor, so scrolling does the work — a card leans back as it rises, stands
 * upright at the middle, and tips away as it leaves.
 */

/**
 * Deterministic rather than random: a Math.random() angle hydrates to a
 * different value on the client and React discards the whole subtree.
 */
const REST_ANGLES = [-2.4, 1.7, -1.1, 2.5, -1.9, 1.2];

/**
 * Below this the board flattens and the scroll lean takes over. A z-rotated
 * card's bounding box is wider than the card, so at phone widths its corners
 * hit the page's overflow clip.
 */
const FLAT_BELOW = "(max-width: 767px)";

/** Degrees a card leans as it crosses the screen. */
const LEAN = 9;

/**
 * The card's crossing, 0 entering to 1 leaving. Shared so the screenshot inside
 * can drift on the same clock rather than opening its own scroll subscription.
 */
const CardProgress = createContext<MotionValue<number> | null>(null);
export const useCardProgress = () => useContext(CardProgress);

export const PinnedCard = ({
  index = 0,
  children,
  className = "",
}: {
  index?: number;
  children: ReactNode;
  className?: string;
}) => {
  const { ref, engaged, reduceMotion, handlers, sx, sy, rotateX, rotateY } =
    useTilt({ range: 9 });
  const compact = useMediaQuery(FLAT_BELOW);
  const container = usePageScrollContainer();

  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    offset: ["start end", "end start"],
  });

  // rotateX rather than a flat rotation: leaning in depth costs no horizontal
  // room, where a z-rotation on a phone drives the corners into the overflow
  // clip.
  const lean = useTransform(scrollYProgress, [0, 0.5, 1], [LEAN, 0, -LEAN]);
  const leanSmooth = useSpring(lean, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.01,
  });

  // Pointer and scroll write to the same axis, so they are summed rather than
  // left to fight. Only one is ever non-zero: the pointer tilt ignores touch,
  // and the lean is gated to compact widths.
  const leanActive = compact && !reduceMotion;
  const tiltX = useTransform<number, number>(
    [rotateX, leanSmooth],
    ([pointer, scroll]: number[]) => pointer + (leanActive ? scroll : 0),
  );

  const sheenX = useTransform(sx, [-0.5, 0.5], ["8%", "92%"]);
  const sheenY = useTransform(sy, [-0.5, 0.5], ["8%", "92%"]);
  const sheen = useMotionTemplate`radial-gradient(22rem circle at ${sheenX} ${sheenY}, rgba(201,185,138,0.20), rgba(201,185,138,0.07) 28%, transparent 65%)`;

  const restAngle = compact ? 0 : REST_ANGLES[index % REST_ANGLES.length];
  const zero = useMotionValue(0);

  return (
    <CardProgress.Provider value={scrollYProgress}>
      <div className={`pin-stage h-full ${className}`}>
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
          whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.015 }}
          {...handlers}
          style={{ rotateX: tiltX, rotateY: leanActive ? zero : rotateY }}
          className={`pin-card group/pin relative h-full rounded-2xl transition-shadow duration-300 ${
            engaged ? "shadow-lifted" : "shadow-pinned"
          }`}
        >
          {/* pin-lift keeps the pin on the board while the card turns under it. */}
          <span
            aria-hidden="true"
            className="pin-lift absolute -top-1.5 left-6 z-30 h-3 w-3 animate-pin-glint rounded-full bg-gradient-to-br from-wheat to-wheat-deep shadow-[0_1px_3px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.5)]"
          />

          {children}

          <motion.span
            aria-hidden="true"
            style={{ backgroundImage: reduceMotion ? undefined : sheen }}
            animate={{ opacity: engaged ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl mix-blend-screen"
          />
        </motion.div>
      </div>
    </CardProgress.Provider>
  );
};
