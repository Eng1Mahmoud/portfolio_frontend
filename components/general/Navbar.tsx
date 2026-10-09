"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import { asideLinks } from "@/utiles/aside-links";
import { IuserInfo } from "@/types/general";
import { handleDownloadCV } from "@/utiles/analytics-events/events";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Floating glass navbar — replaces the sidebar. Same links (asideLinks), same
 * CV action; on small screens it opens a full-screen animated menu.
 */
export const Navbar = ({ profileInfo }: { profileInfo?: IuserInfo }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
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
    if (open) setMenuVisible(true);
  }, [open]);

  useEffect(() => {
    if (!menuVisible) return;
    const root = document.getElementById("page-scroll");
    const previousOverflow = root?.style.overflowY;
    if (root) root.style.overflowY = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
      const controls: HTMLElement[] = toggleRef.current ? [toggleRef.current, ...links] : links;
      const first = controls[0];
      const last = controls.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      if (root) root.style.overflowY = previousOverflow ?? "";
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [menuVisible]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="portfolio-navbar pointer-events-none fixed left-0 top-3 z-1000 px-3 sm:top-4 sm:px-6"
      >
        <div className="pointer-events-auto mx-auto grid grid-cols-[minmax(0,1fr)_auto] lg:flex max-w-6xl items-center justify-between gap-2 lg:gap-4 rounded-full border border-parchment/10 bg-surface-base/60 py-2 pe-2 ps-2 shadow-lifted backdrop-blur-xl">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-full pe-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-sage/40 transition group-hover:ring-sage">
              {profileInfo?.avatar ? (
                <Image
                  src={profileInfo.avatar}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-sage to-wheat font-display font-bold text-surface-base">
                  M
                </span>
              )}
            </span>
            <span className="truncate font-display text-base font-semibold text-ink-strong">
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
                        "relative block rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sage",
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
                          className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-sage to-sage-bright shadow-accent"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {profileInfo?.cv && (
              <a
                href={profileInfo.cv}
                target="_blank"
                download
                onClick={handleDownloadCV}
                className="hidden items-center gap-2 rounded-full border border-sage/40 px-4 py-2 text-sm font-medium text-ink-strong transition hover:border-sage hover:bg-sage/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sage sm:inline-flex"
              >
                <FaDownload aria-hidden="true" className="h-3 w-3" />
                CV
              </a>
            )}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-surface-base transition hover:bg-sage-bright focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base lg:hidden"
            >
              {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence onExitComplete={() => setMenuVisible(false)}>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
            className="portfolio-mobile-menu fixed inset-0 z-999 flex flex-col bg-surface-well lg:hidden"
          >
            <div className="portfolio-mobile-menu-content">
            <ul className="relative space-y-1">
              {asideLinks.map((item, i) => (
                <motion.li
                  key={item.path}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.06 + i * 0.035, duration: reduceMotion ? 0 : 0.28, ease: EASE }}
                >
                  <Link
                    href={item.path}
                    onClick={() => { setActive(item.path); setOpen(false); }}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={clsx(
                      "portfolio-mobile-menu-link font-display font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sage",
                      isActive(item.path)
                        ? "text-sage"
                        : "text-ink-strong hover:text-sage",
                    )}
                  >
                    <span className="font-mono text-xs font-normal text-ink-muted">
                      0{i + 1}
                    </span>
                    <span className="min-w-0 wrap-break-word">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            {profileInfo?.cv && (
              <motion.a
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.24, duration: reduceMotion ? 0 : 0.2 }}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
