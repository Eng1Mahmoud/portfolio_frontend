"use client";

import { ISkill } from "@/types/general";
import Image from "next/image";
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import { handleSkillHover } from "@/utiles/analytics-events/events";

/**
 * A skill tile turns with the same physics as a project card, but half as far
 * and with no pin, no scatter angle and no brass. The pinboard stays the one
 * thing the site is remembered by; these are its quiet echo.
 */
export const SkillCard = ({
  skill,
  index = 0,
}: {
  skill: ISkill;
  index?: number;
}) => {
  const { ref, engaged, reduceMotion, handlers, sx, sy, rotateX, rotateY } =
    useTilt({ range: 9 });

  // A cool edge-light instead of the pinboard's warm sheen — the tiles are
  // interface, not artefacts, so they take the interface accent.
  const glowX = useTransform(sx, [-0.5, 0.5], ["12%", "88%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["12%", "88%"]);
  const glow = useMotionTemplate`radial-gradient(9rem circle at ${glowX} ${glowY}, rgba(34,211,238,0.16), transparent 70%)`;

  return (
    <div className="pin-stage">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.45,
          // Cascades along the row rather than firing all at once; capped so a
          // long category does not leave the last tile waiting a full second.
          delay: Math.min(index, 9) * 0.045,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        {...handlers}
        onMouseEnter={() => handleSkillHover(skill.name)}
        style={{ rotateX, rotateY }}
        className={`pin-card group relative flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center transition-colors duration-300 ${
          engaged
            ? "border-cyan-400/40 bg-white/[0.05]"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <motion.span
          aria-hidden="true"
          style={{ backgroundImage: reduceMotion ? undefined : glow }}
          animate={{ opacity: engaged ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 rounded-xl"
        />

        <Image
          src={skill.imageUrl}
          alt={skill.name}
          width={1000}
          height={1000}
          className="pin-lift relative h-20 w-20 drop-shadow-2xl"
        />
        <p className="relative font-mono text-xs tracking-wide text-ink-body md:text-sm">
          {skill.name}
        </p>
      </motion.div>
    </div>
  );
};
