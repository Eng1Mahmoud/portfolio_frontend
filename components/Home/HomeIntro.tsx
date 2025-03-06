"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const HomeIntro = ({profileInfo}:{profileInfo:IuserInfo}) => {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      variants={textVariants}
      transition={{ duration: 1.5 }}
      className="text-lg md:text-xl leading-relaxed w-full "
    >
      {profileInfo?.bio}
    </motion.p>
  );
};
