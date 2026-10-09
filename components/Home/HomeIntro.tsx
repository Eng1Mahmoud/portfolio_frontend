"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_BIO } from "@/utiles/hero-bio";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import clsx from "clsx";

interface HomeIntroProps {
  profileInfo: IuserInfo;
}

// Every delay is a multiple of BEAT, so the hero shares one rhythm.
const BEAT = 0.09;
const EASE = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.34 + i * BEAT, duration: 0.55, ease: EASE },
  }),
};

/** A heading line that rises out of a clipping mask. */
const lineUp = {
  hidden: { y: "112%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { delay: 0.16 + i * 0.11, duration: 0.85, ease: EASE },
  }),
};

/**
 * The biography arrives as one field of text: blank lines are paragraph
 * breaks, a single line break is just a wrap.
 */
const toParagraphs = (bio: string) =>
  bio
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

export const HomeIntro = ({ profileInfo }: HomeIntroProps) => {
  const reduceMotion = useReducedMotion();
  const name = profileInfo?.userName?.trim() ?? "";
  const role = profileInfo?.title?.trim() ?? "";
  // The hero copy is pinned in code so the presentation stays exactly as
  // written, independent of the dashboard's free-text bio field.
  const paragraphs = toParagraphs(HERO_BIO);

  // "Mahmoud Mohamed" sets on two lines; a single-word name keeps one.
  const nameParts = name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="hero-copy relative min-w-0 w-full max-w-4xl pl-6 text-start sm:pl-10">
      {/* A single hairline anchors the column. */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-sage via-parchment/12 to-transparent"
      />

      {role && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
          className="hero-role mb-4 font-mono text-[11px] uppercase text-sage sm:mb-5 sm:text-xs"
        >
          {role}
        </motion.p>
      )}

      {/* One mask per line, so the halves of the name arrive in turn. */}
      <h1 className="display-hero text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] break-words text-ink-strong">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span
            custom={0}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={lineUp}
            className="block"
          >
            {firstName}
          </motion.span>
        </span>
        {lastName && (
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              custom={1}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={lineUp}
              className="block text-ink-muted"
            >
              {lastName}
            </motion.span>
          </span>
        )}
      </h1>

      {/* The whole biography, so a visitor learns the person before scrolling. */}
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          custom={1 + index}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={rise}
          className={clsx(
            "hero-bio text-[15px] leading-relaxed text-ink-body sm:text-base",
            index === 0 ? "mt-4 sm:mt-5" : "mt-3",
          )}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
};
