"use client";

import { motion } from "framer-motion";

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return (
    <div className="ml-[20px] mb-8">
      <motion.h1
        className="tracking-[3px] text-3xl md:text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {title.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <div className="relative mt-5 w-[150px] h-[5px] bg-blue-500/50 rounded-md">
        <motion.div
          className="absolute top-0 left-0 h-full bg-blue-500/90 rounded-md z-10"
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
