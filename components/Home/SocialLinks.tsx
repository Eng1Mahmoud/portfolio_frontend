"use client";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { handleSocialClick } from "@/utiles/analytics-events/events";

const getVariants = (isMobile: boolean) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 150 : 200,
        damping: isMobile ? 15 : 10,
        duration: isMobile ? 0.3 : 0.5,
      },
    },
  },
});

export const SocialLinks = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variants = getVariants(isMobile);

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: profileInfo?.linkedin,
      color: "hover:text-cyan-400",
      borderColor: "group-hover:border-cyan-400/50",
      shadowColor: "group-hover:shadow-cyan-400/20",
    },
    {
      icon: FaGithub,
      href: profileInfo?.github,
      color: "hover:text-purple-400",
      borderColor: "group-hover:border-purple-400/50",
      shadowColor: "group-hover:shadow-purple-400/20",
    },
    {
      icon: FaWhatsapp,
      href: `https://wa.me/${profileInfo?.phone1}`,
      color: "hover:text-green-400",
      borderColor: "group-hover:border-green-400/50",
      shadowColor: "group-hover:shadow-green-400/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobile ? 0.3 : 0.5 }}
      className="relative"
    >
      <motion.ul
        variants={variants.container}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3 relative"
      >
        {socialLinks.map((social, index) => (
          <motion.li
            key={index}
            variants={variants.item}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const platform = social.href.includes("linkedin")
                  ? "linkedin"
                  : social.href.includes("github")
                    ? "github"
                    : "whatsapp";
                handleSocialClick(platform);
              }}
              className={`block rounded-full border border-white/10 p-3 transition-colors duration-300 hover:border-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${social.borderColor}`}
            >
              <social.icon
                className={`text-lg text-[#93a3bd] transition-colors duration-300 ${social.color}`}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
