"use client";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowUp,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaShareAlt,
  FaTimes,
} from "react-icons/fa";
import { IuserInfo } from "@/types/general";
import { handleSocialClick } from "@/utiles/analytics-events/events";

export const FloatingActions = ({
  profileInfo,
}: {
  profileInfo: IuserInfo;
}) => {
  const reduceMotion = useReducedMotion();
  const [showTop, setShowTop] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const root = document.getElementById("page-scroll");
    if (!root) return;
    const update = () => setShowTop(root.scrollTop > 320);
    const chat = (event: Event) => {
      const open = Boolean((event as CustomEvent<boolean>).detail);
      setChatOpen(open);
      if (open) setExpanded(false);
    };
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setExpanded(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        if (navRef.current?.contains(document.activeElement))
          toggleRef.current?.focus();
      }
    };
    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("portfolio-chat-state", chat);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("portfolio-chat-state", chat);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const phone = profileInfo?.phone1?.replace(/\D/g, "").replace(/^00/, "");
  const links = [
    {
      label: "WhatsApp",
      platform: "whatsapp",
      icon: FaWhatsapp,
      href: phone ? `https://wa.me/${phone}` : "",
    },
    {
      label: "GitHub",
      platform: "github",
      icon: FaGithub,
      href: profileInfo?.github,
    },
    {
      label: "LinkedIn",
      platform: "linkedin",
      icon: FaLinkedinIn,
      href: profileInfo?.linkedin,
    },
  ].filter((link) => link.href);
  return (
    <AnimatePresence>
      {!chatOpen && (
        <motion.nav
          ref={navRef}
          aria-label="Quick contact"
          className="floating-actions fixed! [right:30px]! [bottom:calc(max(24px,_env(safe-area-inset-bottom))_+_70px)]! flex! flex-col! [gap:10px]! [z-index:900]! max-md:[right:22px]! max-md:[bottom:calc(max(16px,_env(safe-area-inset-bottom))_+_70px)]!"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                id="floating-social-links"
                className="floating-social-links absolute! [bottom:calc(100%_+_10px)]! [right:0]! flex! flex-col! [gap:10px]!"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.075,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {links.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    onClick={() => {
                      handleSocialClick(link.platform);
                      setExpanded(false);
                    }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: reduceMotion ? 0 : 14,
                        scale: reduceMotion ? 1 : 0.85,
                      },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.2 }}
                    className={`floating-action relative! flex! items-center! justify-center! w-11! h-11! [flex-shrink:0]! [border-radius:50%]! text-ink-body! bg-surface-panel! [border:var(--social-border)]! [box-shadow:var(--card-shadow)]! [transition:background_200ms,_border-color_200ms,_color_200ms]! [&:hover]:bg-surface-raised! [&:hover]:[border-color:currentColor]! [&:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&:focus-visible]:[outline-offset:4px]! [&:hover_.floating-action-label]:[opacity:1]! [&:focus-visible_.floating-action-label]:[opacity:1]! ${link.platform === "whatsapp" ? "floating-action--whatsapp text-social-whatsapp!" : link.platform === "github" ? "floating-action--github text-ink-strong!" : "floating-action--linkedin text-social-linkedin!"}`}
                  >
                    <link.icon aria-hidden="true" className="h-5 w-5" />
                    <span className="floating-action-label absolute! [right:54px]! whitespace-nowrap! pointer-events-none! [opacity:0]! text-ink-strong! bg-surface-panel! [padding:5px_10px]! [border-radius:4px]! [font-size:12px]! [transition:opacity_150ms]!">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            ref={toggleRef}
            type="button"
            aria-label={expanded ? "Close social links" : "Open social links"}
            aria-expanded={expanded}
            aria-controls="floating-social-links"
            className="floating-action relative! flex! items-center! justify-center! w-11! h-11! [flex-shrink:0]! [border-radius:50%]! text-ink-body! bg-surface-panel! [border:var(--social-border)]! [box-shadow:var(--card-shadow)]! [transition:background_200ms,_border-color_200ms,_color_200ms]! [&:hover]:bg-surface-raised! [&:hover]:[border-color:currentColor]! [&:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&:focus-visible]:[outline-offset:4px]! [&:hover_.floating-action-label]:[opacity:1]! [&:focus-visible_.floating-action-label]:[opacity:1]! floating-action--toggle text-sage-bright!"
            title="Social links"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaShareAlt aria-hidden="true" />
            )}
            <span className="floating-action-label absolute! [right:54px]! whitespace-nowrap! pointer-events-none! [opacity:0]! text-ink-strong! bg-surface-panel! [padding:5px_10px]! [border-radius:4px]! [font-size:12px]! [transition:opacity_150ms]!">
              Social links
            </span>
          </button>
          <AnimatePresence>
            {showTop && (
              <motion.button
                type="button"
                aria-label="Back to top"
                title="Back to top"
                className="floating-action relative! flex! items-center! justify-center! w-11! h-11! [flex-shrink:0]! [border-radius:50%]! text-ink-body! bg-surface-panel! [border:var(--social-border)]! [box-shadow:var(--card-shadow)]! [transition:background_200ms,_border-color_200ms,_color_200ms]! [&:hover]:bg-surface-raised! [&:hover]:[border-color:currentColor]! [&:focus-visible]:[outline:2px_solid_var(--portfolio-accent)]! [&:focus-visible]:[outline-offset:4px]! [&:hover_.floating-action-label]:[opacity:1]! [&:focus-visible_.floating-action-label]:[opacity:1]! floating-action--top text-ink-muted!"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  const root = document.getElementById("page-scroll");
                  if (!root) return;
                  setExpanded(false);
                  root.scrollTo({
                    top: 0,
                    behavior: reduceMotion ? "instant" : "smooth",
                  });
                  window.history.replaceState(
                    null,
                    "",
                    `${window.location.pathname}${window.location.search}#home`,
                  );
                  document
                    .getElementById("home")
                    ?.focus({ preventScroll: true });
                }}
              >
                <FaArrowUp aria-hidden="true" />
                <span className="floating-action-label absolute! [right:54px]! whitespace-nowrap! pointer-events-none! [opacity:0]! text-ink-strong! bg-surface-panel! [padding:5px_10px]! [border-radius:4px]! [font-size:12px]! [transition:opacity_150ms]!">
                  Back to top
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
