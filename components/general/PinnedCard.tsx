"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { type ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * The pinboard.
 *
 * Project cards are screenshots of shipped work, so the page treats them as
 * exactly that: prints pinned to a board by hand, each one a degree or two off
 * square. Bring the pointer to one and it straightens, lifts toward you, and a
 * wheat sheen rakes across the glass — the gesture of leaning in and taking a
 * print down off the wall.
 *
 * This is the one bold element on the site. Everything it touches stays quiet:
 * no per-card glow, no coloured borders, no second accent anywhere else.
 */

/**
 * Rest angles, in degrees. Deterministic and index-derived rather than random
 * so the server and client render the same board — a Math.random() angle
 * hydrates to a different value and React discards the whole subtree.
 *
 * The sequence alternates sign and varies magnitude. A strict -2/+2 alternation
 * reads as a zigzag pattern, which looks designed rather than dropped.
 */
const REST_ANGLES = [-2.4, 1.7, -1.1, 2.5, -1.9, 1.2];

/**
 * Below this width the board flattens. Two reasons, and the second is the one
 * that decides it: a rotated card's bounding box is wider than the card, so at
 * phone widths its corners run into the page's overflow clip — and with one
 * card per row there is no board for a tilt to read against, so a crooked card
 * just looks like a mistake. The pin and the shadow carry the idea instead.
 */
const FLAT_BELOW = "(max-width: 767px)";

export const PinnedCard = ({
  index = 0,
  children,
  className = "",
}: {
  /** Position in the grid — picks the rest angle and the entry delay. */
  index?: number;
  children: ReactNode;
  className?: string;
}) => {
  const { ref, engaged, reduceMotion, handlers, sx, sy, rotateX, rotateY } =
    useTilt({ range: 9 });

  // The sheen's origin tracks the pointer across the card face.
  const sheenX = useTransform(sx, [-0.5, 0.5], ["8%", "92%"]);
  const sheenY = useTransform(sy, [-0.5, 0.5], ["8%", "92%"]);
  // Tight warm core with a wide falloff. A single wide stop reads as a flat
  // tint rather than light landing on a surface.
  const sheen = useMotionTemplate`radial-gradient(22rem circle at ${sheenX} ${sheenY}, rgba(201,185,138,0.20), rgba(201,185,138,0.07) 28%, transparent 65%)`;

  const compact = useMediaQuery(FLAT_BELOW);
  const restAngle = compact ? 0 : REST_ANGLES[index % REST_ANGLES.length];

  return (
    <div className={`pin-stage h-full ${className}`}>
      <motion.div
        ref={ref}
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }
        }
        // Cards arrive already pinned: they drop in past their rest angle and
        // settle onto it, rather than rotating up from square, which would
        // read as a loading spinner.
        //
        // The overshoot is a keyframe pair here rather than a rotation in
        // `initial`, because framer-motion snapshots `initial` once on mount —
        // before the media query that flattens the board on phones has
        // resolved. Cards below the fold were holding the desktop tilt at a
        // width where the board is meant to be square, pushing their corners
        // ~15px past the screen edge until they scrolled into view.
        // `whileInView` is read when it fires, by which point restAngle is
        // correct for the width.
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: reduceMotion ? restAngle : [restAngle * 2.2, restAngle],
        }}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{
          duration: 0.55,
          delay: Math.min(index, 5) * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
        // Straighten and lift while engaged. This rides on whileHover rather
        // than a second `animate` prop, which would fight the entry transition
        // for control of `rotate`.
        whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.015 }}
        {...handlers}
        style={{ rotateX, rotateY }}
        className={`pin-card group/pin relative h-full rounded-2xl transition-shadow duration-300 ${
          engaged ? "shadow-lifted" : "shadow-pinned"
        }`}
      >
        {/* The pin. Brass, set at the corner the card hangs from, and lifted in
            Z so it stays put on the board while the card turns under it. */}
        <span
          aria-hidden="true"
          className="pin-lift absolute -top-1.5 left-6 z-30 h-3 w-3 animate-pin-glint rounded-full bg-gradient-to-br from-wheat to-wheat-deep shadow-[0_1px_3px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.55)]"
        />

        {children}

        {/* Sheen, over the content but never in the way of a click. */}
        <motion.span
          aria-hidden="true"
          style={{ backgroundImage: reduceMotion ? undefined : sheen }}
          animate={{ opacity: engaged ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl mix-blend-screen"
        />
      </motion.div>
    </div>
  );
};
