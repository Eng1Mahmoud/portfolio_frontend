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

  // One hover treatment for all three. They used to hover in each platform's
  // own brand colour, which put three unrelated hues on the quietest corner of
  // the page.
  const socialLinks = [
    { icon: FaLinkedin, href: profileInfo?.linkedin },
    { icon: FaGithub, href: profileInfo?.github },
    { icon: FaWhatsapp, href: `https://wa.me/${profileInfo?.phone1}` },
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
              className="block rounded-full border border-parchment/10 p-3 transition-colors duration-300 hover:border-sage/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <social.icon className="text-lg text-ink-muted transition-colors duration-300 group-hover:text-sage" />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
