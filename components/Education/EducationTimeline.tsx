"use client";
import { motion } from "framer-motion";

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
    <div className="relative pl-12">
      {/* Vertical line - now positioned on the left with spacing */}
      <div className="absolute left-2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/30"></div>

      {educationData.map((item, index) => (
        <motion.div
          key={item.id}
          className="mb-12 flex flex-col relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* Timeline point - positioned directly over the line */}
          <div className="absolute left-[-38] top-0 w-6 h-6 rounded-full bg-primary-dark border-4 border-blue-500 z-10 -translate-x-1/2 shadow-md shadow-blue-500/50"></div>

          {/* Time period */}
          <div className="mb-4">
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1 px-3 rounded-full shadow-sm">
              {item.period}
            </span>
          </div>

          {/* Content card */}
          <motion.div
            className="bg-gradient-to-br from-[#0D1127]/90 to-[#1a1f3c]/90 p-6 rounded-lg shadow-xl shadow-blue-900/20 border border-blue-500/30 backdrop-blur-sm"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
              {item.degree}
            </h3>
            <h4 className="text-md text-blue-400 font-medium mb-3">
              {item.institution}
            </h4>
            <p className="text-gray-300 text-sm">{item.description}</p>
            <div className="mt-4">
              {/* Skills list */}
              <h5 className="text-sm font-semibold text-blue-400 mb-2">
                Skills Acquired:
              </h5>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
