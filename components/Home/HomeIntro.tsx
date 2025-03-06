"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-2xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative p-6 md:p-8 bg-gradient-to-br from-[#0D1127]/90 to-[#1a1f3c]/90 rounded-xl border-2 border-blue-500/20 shadow-xl shadow-blue-900/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 md:top-6 left-2 md:left-4 text-blue-400/50"
        >
          <FaQuoteLeft className="w-4 h-4 md:w-6 md:h-6" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 right-2 md:right-4 text-purple-400/50"
        >
          <FaQuoteRight className="w-4 h-4 md:w-6 md:h-6" />
        </motion.div>
        <p className="text-lg md:text-xl leading-relaxed w-full px-2 md:px-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              whileHover={{ scale: 1.05, color: "#60A5FA" }}
              className="inline-block mr-2"
            >
              <span className="bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-300 cursor-default">
                {word}
              </span>
            </motion.span>
          ))}
        </p>
      </div>
    </motion.div>
  );
};
