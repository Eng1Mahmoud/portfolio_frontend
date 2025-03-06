"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import animation from "@/public/animation.gif";

export const AnimatedImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full md:w-1/2 flex justify-center "
    >
      <motion.div
        className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden -top-10 md:top-0 z-[12] group"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl" />
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 40px rgba(59, 130, 246, 0.5)",
              "0 0 20px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-full w-full"
        >
          <Image
            src={animation}
            alt="Developer Animation"
            fill
            priority
            className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
