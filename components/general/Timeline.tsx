"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns when it is called during server rendering. This is the
// standard guard: the layout timing matters only on the client, where it is
// what guarantees the container is resolved before useScroll subscribes.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A timeline is the one structure on this site where order genuinely carries
 * information, so the rail is the thing that animates: a dim track with a lit
 * segment that fills as you read down it, and a node that ignites as each
 * entry arrives. Scroll position drives it, so the progress you see is the
 * progress you have actually made through the history.
 */
/**
 * Where the rail runs: 10px from the timeline's left edge, which is exactly
 * where the entry nodes land at both breakpoints. Shared so the line and the
 * dots can never be nudged apart by editing one and not the other.
 */
const RAIL_X = "absolute left-[10px] top-0 h-full -translate-x-1/2";

/*
  Reveal margins are vertical-only ("-Npx 0px"), never the one-value shorthand.

  `margin` becomes the IntersectionObserver rootMargin, and a single value
  insets all four sides. On a 390px-wide phone "-80px" narrows the trigger box
  to x 80–310, which is enough to miss a small element pinned near the left
  edge entirely — the timeline node is 16px wide at x 18, so it never
  intersected and sat at its initial opacity: 0 forever. It looked fine on a
  desktop only because the same box is 1280px wide there.
*/
export const Timeline = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  /*
    The page scrolls inside a container in the layout, not in the window, and
    scroll events do not bubble. Without this the rail would subscribe to the
    window — which never scrolls here — and sit frozen at zero.

    Declared before useScroll so that this layout effect runs first and the ref
    is populated by the time useScroll reads `container.current`.
  */
  const containerRef = useRef<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    containerRef.current = document.getElementById("page-scroll");
  }, []);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    // Starts filling when the top of the list reaches three-quarters down the
    // viewport, and is full once the bottom clears the halfway mark — so the
    // rail completes as the last entry is read, not after it has scrolled off.
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
        Everything on the rail is centred on RAIL_X by a plain wrapper, and the
        animated part lives inside it.

        This split is not cosmetic: framer-motion writes `transform` as an
        inline style, which outranks Tailwind's `-translate-x-1/2` class and
        silently wipes the centring — leaving the element sitting half its own
        width to the right of the line it is supposed to be on.
      */}

      {/* Track. */}
      <span aria-hidden="true" className={`${RAIL_X} w-px bg-white/10`} />

      {/* Lit segment. */}
      <span aria-hidden="true" className={`${RAIL_X} w-px`}>
        <motion.span
          style={{ scaleY: fill, transformOrigin: "top" }}
          className="block h-full w-full bg-gradient-to-b from-cyan-400 to-cyan-400/40"
        />
      </span>

      {/* The reading head, riding the end of the lit segment. */}
      <span aria-hidden="true" className={`${RAIL_X} w-px`}>
        <motion.span
          style={{ top: glowY }}
          className="absolute h-16 w-px bg-gradient-to-b from-cyan-300 to-transparent blur-[2px]"
        />
      </span>

      {children}
    </div>
  );
};

/**
 * One entry on the rail. Owns its node so the node and the card can never
 * drift out of step — they previously lived in two different components and
 * were rendered twice on the experience page.
 */
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
        The node. One element for both breakpoints — the previous pair of
        `hidden md:block` / `md:hidden` dots meant two nodes to keep in sync
        for one dot on screen.

        The outer span does the positioning and the inner one does the
        animation, for the same reason as the rail above: framer-motion's
        inline transform would otherwise overwrite the centring translate and
        park the dot beside the line instead of on it.

        Its offsets land the centre on the rail at both widths: the entry
        starts at the container's 32px / 48px left padding, and -22 / -38
        brings the centre back to RAIL_X.
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
          className="block h-full w-full rounded-full border-2 border-cyan-400 bg-surface-well shadow-[0_0_14px_rgba(34,211,238,0.55)]"
        />
      </span>
      {children}
    </motion.div>
  );
};
