"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Text that arrives a word at a time, each word rising out of a clipping mask.
 *
 * Only transform and opacity move, so the whole reveal runs on the compositor.
 * Use it on headings and short lines — a long paragraph would put a hundred
 * animated elements on screen at once for no gain.
 */

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const RevealText = ({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.055,
  trigger = "mount",
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" for above-the-fold text, "scroll" for anything further down. */
  trigger?: "mount" | "scroll";
}) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  const activate =
    trigger === "scroll"
      ? {
          whileInView: "visible",
          viewport: { once: true, margin: "-60px 0px" },
        }
      : { animate: "visible" };

  if (reduceMotion) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {/* The whole string for assistive tech; the split copy is decorative, so
          a screen reader never hears it word by word. */}
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        {...activate}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        // inline-flex with wrap so the masks sit on the text baseline and long
        // headings still break across lines.
        className="inline-flex flex-wrap"
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            // pb absorbs descenders the mask would otherwise shave off.
            className="inline-block overflow-hidden pb-[0.14em]"
          >
            <motion.span variants={word} className="inline-block">
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
