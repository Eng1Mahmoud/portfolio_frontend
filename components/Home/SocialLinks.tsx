"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
};

export const SocialLinks = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const socialLinks = [
    {
      icon: FaLinkedin,
      href: profileInfo?.linkedin,
      bgColor: "bg-gradient-to-br from-blue-600 to-blue-400",
      iconColor: "text-white",
    },
    {
      icon: FaGithub,
      href: profileInfo?.github,
      bgColor: "bg-gradient-to-br from-gray-800 to-gray-600",
      iconColor: "text-white",
    },
    {
      icon: FaWhatsapp,
      href: `https://wa.me/${profileInfo?.phone1}`,
      bgColor: "bg-gradient-to-br from-green-600 to-green-400",
      iconColor: "text-white",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative p-4"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-xl"
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
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center space-x-8 relative"
      >
        {socialLinks.map((social, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-xl ${social.bgColor} transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20`}
            >
              <social.icon className={`text-3xl ${social.iconColor}`} />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
