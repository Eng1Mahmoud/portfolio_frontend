"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { IuserInfo } from "@/types/general";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import clsx from "clsx";
import { useEffect } from "react";

interface HomeIntroProps {
  profileInfo: IuserInfo;
  projectCount: number;
  technologyCount: number;
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

/** Real data, so the figures count rather than fade. */
const Counter = ({ value, delay }: { value: number; delay: number }) => {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 1.1,
      delay,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, value, delay, reduceMotion]);

  // The static value stays in the DOM for screen readers and for the moment
  // before hydration; the animated one is decorative.
  return (
    <>
      <motion.span aria-hidden="true">{rounded}</motion.span>
      <span className="sr-only">{value}</span>
    </>
  );
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

/** Years since the birth date, counted the way the old About spec sheet did. */
const BIRTH_DATE = "2001-03-26";
const yearsSince = (birthDate: string) => {
  const dateOfBirth = new Date(birthDate);
  const ageDate = new Date(Date.now() - dateOfBirth.getTime());
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const HomeIntro = ({
  profileInfo,
  projectCount,
  technologyCount,
}: HomeIntroProps) => {
  const reduceMotion = useReducedMotion();
  const name = profileInfo?.userName?.trim() ?? "";
  const role = profileInfo?.title?.trim() ?? "";
  const paragraphs = toParagraphs(profileInfo?.bio ?? "");

  // The details that used to sit in a spec sheet, kept as one quiet line.
  // Name, address and CV already have their own places in the hero.
  const facts = [
    { label: "Age", value: `${yearsSince(BIRTH_DATE)}` },
    { label: "Nationality", value: "Egyptian" },
    { label: "Languages", value: "Arabic, English" },
    { label: "Freelance", value: "Available" },
  ];

  // "Mahmoud Mohamed" sets on two lines; a single-word name keeps one.
  const nameParts = name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const figures = [
    { value: projectCount, label: "projects shipped" },
    // From the skills collection, so "used" would overstate it.
    { value: technologyCount, label: "technologies" },
  ];

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

      {/* Real figures, read from the projects the site already loads. */}
      <motion.dl
        custom={1 + paragraphs.length}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={rise}
        className="hero-figures mt-6 grid grid-cols-2 gap-4 border-t border-parchment/10 pt-4 font-mono sm:mt-8 sm:pt-5"
      >
        {/* dt before dd keeps the list valid; `order` flips them visually. */}
        {figures.map((figure, index) => (
          <div key={figure.label} className="min-w-0 flex flex-col gap-1">
            <dt className="order-2 text-[10px] uppercase text-ink-muted sm:text-[11px]">
              {figure.label}
            </dt>
            <dd className="order-1 text-xl text-sage tabular-nums sm:text-2xl">
              <Counter value={figure.value} delay={0.7 + index * 0.12} />
            </dd>
          </div>
        ))}
      </motion.dl>

      {/* One quiet line of details, set as a definition list. */}
      <motion.dl
        custom={2 + paragraphs.length}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={rise}
        className="hero-facts mt-5 font-mono"
      >
        {facts.map((fact) => (
          <div key={fact.label} className="hero-fact min-w-0">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              {fact.label}
            </dt>
            <dd className="min-w-0 break-words text-[11px] text-ink-strong">
              {fact.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
};
