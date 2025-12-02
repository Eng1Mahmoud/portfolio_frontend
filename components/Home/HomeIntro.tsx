"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export const HomeIntro = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const words = profileInfo?.bio?.split(" ") || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-5xl mx-auto my-4"
    >
      {/* Neon Glow Behind */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

      <div className="relative p-4 md:p-12 bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 -left-4 bg-[#0f172a] p-2 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <FaQuoteLeft className="w-5 h-5 text-cyan-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-4 -right-4 bg-[#0f172a] p-2 rounded-full border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <FaQuoteRight className="w-5 h-5 text-purple-400" />
        </motion.div>

        <p className="text-md md:text-xl lg:text-2xl leading-relaxed text-start md:text-center font-light text-gray-300">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              whileHover={{
                scale: 1.1,
                color: "#22d3ee",
                textShadow: "0 0 8px rgba(34,211,238,0.5)",
              }}
              className="inline-block mr-2 transition-colors duration-200"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </motion.div>
  );
};
