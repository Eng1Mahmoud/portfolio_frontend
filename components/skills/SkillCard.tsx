"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { ISkill } from "@/types/general";
import Image from "next/image";
import { motion } from "framer-motion";
import { handleSkillHover } from "@/utiles/analytics-events/events";

export const SkillCard = ({ skill, index = 0 }: { skill: ISkill; index?: number }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.035 }}
      onMouseEnter={() => handleSkillHover(skill.name)}
      className="skill-tile"
    >
      <span className="skill-icon"><Image src={skill.imageUrl} alt="" width={40} height={40} className="h-8 w-8 object-contain" /></span>
      <p className="min-w-0 break-words text-sm font-medium text-ink-strong">{skill.name}</p>
    </motion.div>
  );
};
