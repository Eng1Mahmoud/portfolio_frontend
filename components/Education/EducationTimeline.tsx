"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";

// Timeline data - replace with your own education info
const educationData = [
  {
    id: 1,
    period: "2019 - 2023",
    degree: "Bachelor of Information Technology",
    institution: "Sohag University",
    description:
      "Graduated with a Bachelor's degree in Information Technology, specializing in software development and data management. Developed strong programming skills and a solid understanding of IT infrastructure.",
    skills: [
      "Javascript",
      "Python",
      "PHP",
      "HTML/CSS",
      "database Management",
      "Software Development",
      "Algorithms",
      "Data Structures",
    ],
  },
];

export default function EducationTimeline() {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Vertical line */}
      <div className="absolute left-2 md:left-2 h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/30"></div>

      {educationData.map((item, index) => (
        <motion.div
          key={item.id}
          className="mb-12 flex flex-col relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* Timeline point with glow */}
          <div className="absolute left-[-38px] md:left-[-38px] top-0 w-6 h-6 rounded-full bg-[#0D1127] border-4 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block"></div>

          {/* Mobile Timeline point with glow */}
          <div className="absolute left-[-22px] top-0 w-5 h-5 rounded-full bg-[#0D1127] border-2 border-cyan-500 z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(6,182,212,0.5)] md:hidden block"></div>

          {/* Time period */}
          <div className="mb-4">
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-1.5 px-4 rounded-full shadow-lg shadow-cyan-500/20 border border-cyan-500/20 backdrop-blur-sm">
              {item.period}
            </span>
          </div>

          {/* Content card */}
          <div className="group relative rounded-xl p-[1px] bg-gradient-to-br from-cyan-500/50 via-blue-500/30 to-purple-500/50 shadow-xl shadow-blue-900/20">
            <div className="relative overflow-hidden bg-[#0f172a]/90 backdrop-blur-xl rounded-xl p-4 md:p-6 h-full">
              {/* Hover Gradient Overlay */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                      <FaGraduationCap className="text-cyan-400" />
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-300 mt-2">
                      <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                        <FaUniversity className="text-cyan-400 text-sm" />
                        <span className="font-semibold text-sm md:text-base text-gray-200">
                          {item.institution}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                  {item.description}
                </p>

                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">
                    Skills Acquired
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-[10px] md:text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 text-blue-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
