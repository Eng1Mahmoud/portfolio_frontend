"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowUp, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { IuserInfo } from "@/types/general";
import { handleSocialClick } from "@/utiles/analytics-events/events";

export const FloatingActions = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const reduceMotion = useReducedMotion();
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const root = document.getElementById("page-scroll");
    if (!root) return;
    const update = () => setShowTop(root.scrollTop > 320);
    update();
    root.addEventListener("scroll", update, { passive: true });
    return () => root.removeEventListener("scroll", update);
  }, []);

  const phone = profileInfo?.phone1?.replace(/\D/g, "").replace(/^00/, "");
  const links = [
    { label: "WhatsApp", platform: "whatsapp", icon: FaWhatsapp, href: phone ? `https://wa.me/${phone}` : "" },
    { label: "GitHub", platform: "github", icon: FaGithub, href: profileInfo?.github },
    { label: "LinkedIn", platform: "linkedin", icon: FaLinkedinIn, href: profileInfo?.linkedin },
  ].filter(link => link.href);

  return (
    <nav aria-label="Quick contact" className="floating-actions">
      {links.map((link, index) => (
        <motion.a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          onClick={() => handleSocialClick(link.platform)}
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.09, duration: 0.4 }}
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          className="floating-action group"
        >
          <link.icon aria-hidden="true" className="h-5 w-5" />
          <span className="floating-action-label">{link.label}</span>
        </motion.a>
      ))}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            className="floating-action floating-action--top group"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            onClick={() => {
              const root = document.getElementById("page-scroll");
              if (!root) return;
              root.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
              window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
              document.getElementById("home")?.focus({ preventScroll: true });
            }}
          >
            <FaArrowUp aria-hidden="true" className="h-4 w-4" />
            <span className="floating-action-label">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </nav>
  );
};