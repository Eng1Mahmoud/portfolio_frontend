"use client";
import { IuserInfo } from "@/types/general";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
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

export const HomeIntro = ({
  profileInfo,
  projectCount,
  technologyCount,
}: HomeIntroProps) => {
  const name = profileInfo?.userName?.trim() ?? "";
  const role = profileInfo?.title?.trim() ?? "";
  const bio = profileInfo?.bio?.trim() ?? "";

  // A blank line in the bio field promotes the first paragraph to a lead.
  const [lead, ...rest] = bio.split(/\n\s*\n/);
  const body = rest.join("\n\n");

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
    <div className="relative w-full max-w-4xl pl-6 text-start sm:pl-10">
      {/* A single hairline anchors the column. */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-sage via-parchment/12 to-transparent"
      />

      {role && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-sage sm:text-xs"
        >
          {role}
        </motion.p>
      )}

      {/* One mask per line, so the halves of the name arrive in turn. */}
      <h1 className="display-hero text-[clamp(2.6rem,9.5vw,5.5rem)] leading-[0.92] text-ink-strong">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span
            custom={0}
            initial="hidden"
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
              initial="hidden"
              animate="visible"
              variants={lineUp}
              className="block text-ink-muted"
            >
              {lastName}
            </motion.span>
          </span>
        )}
      </h1>

      {bio && (
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={rise}
          className="mt-7 max-w-[58ch] space-y-3"
        >
          <p className="whitespace-pre-line text-[0.975rem] leading-[1.75] text-ink-body sm:text-[1.0625rem]">
            {lead}
          </p>
          {body && (
            <p className="whitespace-pre-line text-[0.9rem] leading-[1.75] text-ink-muted sm:text-[0.95rem]">
              {body}
            </p>
          )}
        </motion.div>
      )}

      {/* Real figures, read from the projects the site already loads. */}
      <motion.dl
        custom={1}
        initial="hidden"
        animate="visible"
        variants={rise}
        className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-parchment/10 pt-5 font-mono"
      >
        {/* dt before dd keeps the list valid; `order` flips them visually. */}
        {figures.map((figure, index) => (
          <div key={figure.label} className="flex items-baseline gap-2">
            <dt className="order-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {figure.label}
            </dt>
            <dd className="order-1 text-xl text-sage tabular-nums sm:text-2xl">
              <Counter value={figure.value} delay={0.7 + index * 0.12} />
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
};
