"use client";

import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const socialVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const SocialLinks = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const socialLinks = [
    {
      icon: FaLinkedin,
      href: profileInfo?.linkedin,
      color: "text-blue-600 hover:text-blue-400",
    },
    {
      icon: FaGithub,
      href: profileInfo?.github,
      color: "text-gray-200 hover:text-white",
    },
  ];

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={socialVariants}
      transition={{ duration: 1.5 }}
      className="flex space-x-6 justify-center"
    >
      {socialLinks.map((social, index) => (
        <li key={index}>
          <Link
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-3xl transition-colors duration-300 ${social.color}`}
          >
            <social.icon />
          </Link>
        </li>
      ))}
    </motion.ul>
  );
};
