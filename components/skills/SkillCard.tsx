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
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:opacity-75 transition-opacity"
      />
      <motion.div
        className="flex flex-col gap-2 justify-center items-center text-center p-6 bg-gradient-to-br from-surface-card to-surface-card-to rounded-xl border-2 border-blue-500/50 shadow-xl shadow-blue-900/20 relative z-10 backdrop-blur-sm"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
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
          className="text-sm md:text-base font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
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
