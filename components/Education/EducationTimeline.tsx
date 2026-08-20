"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { IEducation } from "@/types/general";
import Image from "next/image";

export default function EducationTimeline({
  educations,
}: {
  educations: IEducation[];
}) {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Vertical line */}
      <div className="absolute left-2 md:left-2 h-full w-1 bg-gradient-to-b from-cyan-400/70 to-transparent rounded-full shadow-lg shadow-cyan-500/30"></div>

      {educations.map((item, index) => (
        <motion.div
          key={item._id}
          className="mb-12 flex flex-col relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* Timeline point with glow */}
          <div className="absolute left-[-38px] md:left-[-38px] top-0 w-6 h-6 rounded-full bg-surface-card border-4 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block"></div>

          {/* Mobile Timeline point with glow */}
          <div className="absolute left-[-22px] top-0 w-5 h-5 rounded-full bg-surface-card border-2 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(6,182,212,0.5)] md:hidden block"></div>

          {/* Time period */}
          <div className="mb-4">
            <span className="text-sm font-bold bg-white/[0.06] text-white py-1.5 px-4 rounded-full shadow-lg shadow-cyan-500/20 border border-cyan-500/20 backdrop-blur-sm">
              {item.startDate} - {item.endDate}
            </span>
          </div>

          {/* Content card */}
          <div className="group relative rounded-xl p-[1px] bg-white/10 shadow-xl shadow-blue-900/20">
            <div className="relative overflow-hidden bg-surface-panel/90 backdrop-blur-xl rounded-xl p-4 md:p-6 h-full">
              {/* Hover Gradient Overlay */}
              <motion.div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.institution || item.degree}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-ink-strong flex items-center gap-2">
                        <FaGraduationCap className="text-cyan-400" />
                        {item.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-ink-body mt-2">
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1">
                          <FaUniversity className="text-cyan-400 text-sm" />
                          <span className="font-semibold text-sm md:text-base text-gray-200">
                            {item.institution}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mb-6 whitespace-pre-line border-l border-cyan-400/40 pl-4 text-sm leading-relaxed text-ink-body md:text-base">
                  {item.description}
                </p>
                {item.skills &&
                  Array.isArray(item.skills) &&
                  item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-ink-muted"
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
      ))}
    </div>
  );
}
