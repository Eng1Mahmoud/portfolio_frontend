"use client";
import { IExperience } from "@/types/general";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";

export const ExperienceCard = ({
  experience,
  index = 0,
}: {
  experience: IExperience;
  index?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-12 flex flex-col relative"
    >
      {/* Timeline point with glow */}
      <div className="absolute left-[-38px] md:left-[-38px] top-0 w-6 h-6 rounded-full bg-surface-card border-4 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block"></div>

      {/* Mobile Timeline point with glow */}
      <div className="absolute left-[-22px] top-0 w-5 h-5 rounded-full bg-surface-card border-2 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(6,182,212,0.5)] md:hidden block"></div>

      {/* Time period */}
      <div className="mb-4">
        <span className="text-sm font-bold bg-white/[0.06] text-white py-1.5 px-4 rounded-full shadow-lg shadow-cyan-500/20 border border-cyan-500/20 backdrop-blur-sm">
          {experience.startDate} - {experience.endDate}
        </span>
      </div>

      {/* Card Container with Gradient Border */}
      <div className="group relative rounded-xl p-[1px] bg-white/10 shadow-xl shadow-blue-900/20">
        <div className="relative overflow-hidden bg-surface-panel/90 backdrop-blur-xl rounded-xl p-4 md:p-6 h-full">
          {/* Hover Gradient Overlay */}
          <motion.div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                {experience.image && (
                  <Image
                    src={experience.image}
                    alt={experience.company || experience.role}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-ink-strong">
                    {experience.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-gray-300 mt-2">
                    <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                      <FaBriefcase className="text-cyan-400 text-sm" />
                      <span className="font-semibold text-sm md:text-base text-gray-200">
                        {experience.company}
                      </span>
                    </div>
                    {experience.workType && (
                      <span className="text-[10px] md:text-xs px-2 py-1 rounded-md border border-white/10 bg-white/[0.04] text-ink-muted font-medium tracking-wide">
                        {experience.workType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-cyan-400" />
                  <span className="text-gray-300">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed border-l-2 border-cyan-500/30 pl-4 whitespace-pre-line">
              {experience.description}
            </p>

            {experience.skills &&
              Array.isArray(experience.skills) &&
              experience.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-ink-muted hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
