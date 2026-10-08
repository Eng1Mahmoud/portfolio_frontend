"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import { asideLinks } from "@/utiles/aside-links";
import { IuserInfo } from "@/types/general";
import { handleDownloadCV } from "@/utiles/analytics-events/events";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Floating glass navbar — replaces the sidebar. Same links (asideLinks), same
 * CV action; on small screens it opens a full-screen animated menu.
 */
export const Navbar = ({ profileInfo }: { profileInfo?: IuserInfo }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/#home");
  const isActive = (path: string) => active === path;
  useEffect(() => {
    const root = document.getElementById("page-scroll");
    if (!root) return;
    const update = () => {
      const line = root.getBoundingClientRect().top + 180;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section.portfolio-section[id]"));
      const current = sections.filter(section => section.getBoundingClientRect().top <= line).at(-1);
      if (current) setActive(`/#${current.id}`);
    };
    update();
    root.addEventListener("scroll", update, { passive: true });
    return () => root.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-3 z-[1000] px-3 sm:top-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-parchment/10 bg-surface-base/60 py-2 pe-2 ps-2 shadow-lifted backdrop-blur-xl">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full pe-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span className="relative block h-9 w-9 overflow-hidden rounded-full ring-1 ring-sage/40 transition group-hover:ring-sage">
              {profileInfo?.avatar ? (
                <Image
                  src={profileInfo.avatar}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sage to-wheat font-display font-bold text-surface-base">
                  M
                </span>
              )}
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-ink-strong">
              Mahmoud<span className="text-sage">.</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <LayoutGroup id="navbar">
              <ul className="flex items-center gap-0.5">
                {asideLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setActive(item.path)}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      className={clsx(
                        "relative block rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage",
                        isActive(item.path)
                          ? "text-surface-base"
                          : "text-ink-muted hover:text-ink-strong",
                      )}
                    >
                      {isActive(item.path) && (
                        <motion.span
                          layoutId="navbar-pill"
                          aria-hidden="true"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-sage to-sage-bright shadow-accent"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="flex items-center gap-2">
            {profileInfo?.cv && (
              <a
                href={profileInfo.cv}
                target="_blank"
                download
                onClick={handleDownloadCV}
                className="hidden items-center gap-2 rounded-full border border-sage/40 px-4 py-2 text-sm font-medium text-ink-strong transition hover:border-sage hover:bg-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage sm:inline-flex"
              >
                <FaDownload aria-hidden="true" className="h-3 w-3" />
                CV
              </a>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-surface-base transition hover:bg-sage-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base lg:hidden"
            >
              {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[999] flex flex-col justify-center bg-surface-well/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <ul className="relative space-y-1">
              {asideLinks.map((item, i) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={item.path}
                    onClick={() => { setActive(item.path); setOpen(false); }}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={clsx(
                      "flex items-baseline gap-4 py-1.5 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl",
                      isActive(item.path)
                        ? "text-sage"
                        : "text-ink-strong hover:text-sage",
                    )}
                  >
                    <span className="font-mono text-xs font-normal text-ink-muted">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            {profileInfo?.cv && (
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                href={profileInfo.cv}
                target="_blank"
                download
                onClick={handleDownloadCV}
                className="relative mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-surface-base"
              >
                <FaDownload aria-hidden="true" className="h-3 w-3" />
                Download CV
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
