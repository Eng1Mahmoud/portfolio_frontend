"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { ISkill } from "@/types/general";
import Image from "next/image";
import { motion } from "framer-motion";
import { handleSkillHover } from "@/utiles/analytics-events/events";

export const SkillCard = ({
  skill,
  index = 0,
}: {
  skill: ISkill;
  index?: number;
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.035 }}
      onMouseEnter={() => handleSkillHover(skill.name)}
      className="skill-tile grid! [grid-template-columns:40px_minmax(0,_1fr)]! items-center! gap-3! min-h-16! [padding:10px_12px]! [border:var(--hairline-border)]! [border-radius:12px]! [background:var(--glass-background)]! [transition:border-color_300ms,_box-shadow_300ms]! [&:hover]:[border-color:var(--glass-hover-border)]! [&:hover]:bg-surface-raised! relative! isolate! [backdrop-filter:blur(14px)_saturate(140%)]! [box-shadow:var(--glass-shadow)]! [&::before]:[content:'']! [&::before]:absolute! [&::before]:[inset:0]! [&::before]:[z-index:-1]! [&::before]:[border-radius:inherit]! [&::before]:pointer-events-none! [&::before]:[background:var(--glass-hover-shadow)]! [&::before]:[opacity:0.7]! [&::before]:[transition:opacity_300ms]! [&:hover]:[box-shadow:var(--glass-corner-light)]! [&:hover::before]:[opacity:1]!"
    >
      <span className="skill-icon grid! w-10! h-10! place-items-center!">
        <Image
          src={skill.imageUrl}
          alt=""
          width={40}
          height={40}
          className="h-8 w-8 object-contain"
        />
      </span>
      <p className="min-w-0 wrap-break-word text-sm font-medium text-ink-strong">
        {skill.name}
      </p>
    </motion.div>
  );
};
