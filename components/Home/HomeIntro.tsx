"use client";

import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const HomeIntro = () => {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      variants={textVariants}
      transition={{ duration: 1.5 }}
      className="text-lg md:text-xl mb-8 leading-relaxed w-full md:w-[80%] mx-auto "
    >
      I am a Frontend Engineer with a degree in Computers and AI, specializing
      in React and Next.js. I build scalable, high-performance web applications
      that enhance user engagement and business growth. Passionate about clean
      code, innovation, and seamless UX, I thrive in fast-paced environments to
      deliver impactful digital solutions.
    </motion.p>
  );
};
