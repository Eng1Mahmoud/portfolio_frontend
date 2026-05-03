"use client";
import { motion } from "framer-motion";
import { IExperience } from "@/types/general";
import { ExperienceCard } from "@/components/Experience/ExperienceCard";

export default function ExperienceTimeline({
  experiences,
}: {
  experiences: IExperience[];
}) {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Vertical line */}
      <div className="absolute left-2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/30"></div>

      {experiences.map((item, index) => (
        <motion.div
          key={item._id}
          className="mb-12 flex flex-col relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
        >
          {/* Timeline point */}
          <div className="absolute left-[-38px] md:left-[-38px] top-0 w-6 h-6 rounded-full bg-[#0D1127] border-4 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block"></div>
          <div className="absolute left-[-22px] top-0 w-5 h-5 rounded-full bg-[#0D1127] border-2 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(6,182,212,0.5)] md:hidden block"></div>

          <ExperienceCard experience={item} index={index} />
        </motion.div>
      ))}
    </div>
  );
}
