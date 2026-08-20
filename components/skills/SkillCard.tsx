"use client";

import { ISkill } from "@/types/general";
import Image from "next/image";
import { motion } from "framer-motion";
import { handleSkillHover } from "@/utiles/analytics-events/events";

export const SkillCard = ({ skill }: { skill: ISkill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => handleSkillHover(skill.name)}
      className="voltage-card relative group"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
      />
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors group-hover:border-cyan-400/40"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={skill.imageUrl}
            alt={skill.name}
            width={1000}
            height={1000}
            className="w-20 h-20 drop-shadow-2xl transition-transform"
          />
        </motion.div>
        <motion.p
          className="font-mono text-xs tracking-wide text-ink-body md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {skill.name}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
