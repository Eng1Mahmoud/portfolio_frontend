"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asideLinks } from "@/utiles/aside-links";
import Divider from "@/components/general/Divider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IuserInfo } from "@/types/general";
import { LayoutGroup, motion } from "framer-motion";
import clsx from "clsx";
import { handleDownloadCV } from "@/utiles/analytics-events/events";
export const Aside = ({
  setIsAsideOpen,
  profileInfo,
  scope,
}: {
  setIsAsideOpen?: Dispatch<SetStateAction<boolean>>;
  profileInfo?: IuserInfo;
  /**
   * Both copies are mounted at once, so the sliding marker needs a namespace
   * per copy — one shared `layoutId` makes framer-motion try to animate it
   * between two sidebars that are never on screen together.
   */
  scope: "desktop" | "mobile";
}) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileConfig = {
    initial: { x: -50, opacity: 1 },
    animate: { x: 0 },
    transition: { duration: 0.2 },
  };

  const desktopConfig = {
    initial: { x: -100, opacity: 1 },
    animate: { x: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.aside
      {...(isMobile ? mobileConfig : desktopConfig)}
      className="h-screen overflow-y-auto overflow-x-hidden w-full bg-surface-base text-ink-body flex flex-col items-center relative z-[100] scrollBar border-e border-parchment/10 py-10"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          delay: isMobile ? 0.1 : 0.3,
          type: "spring",
          stiffness: isMobile ? 150 : 200,
        }}
        className="avatar mb-8 relative group"
      >
        <div className="rounded-full p-[3px] ring-1 ring-parchment/15 transition-colors group-hover:ring-sage/50 relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={profileInfo?.avatar as string}
              alt="avatar"
              width={1000}
              height={1000}
              priority
              unoptimized
              className="rounded-full w-[140px] h-[140px] object-cover"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0.2 : 0.5 }}
      >
        <nav aria-label="Main navigation" className="w-full">
          <LayoutGroup id={`aside-${scope}`}>
            <ul className="space-y-2 px-3 sm:px-4">
              {asideLinks.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: isMobile ? 0.1 * index : 0.2 * index }}
                  className="w-full"
                >
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Link
                      href={item.path}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      onClick={() => setIsAsideOpen && setIsAsideOpen(false)}
                      className={clsx(
                        // Left-aligned with a rail marker, so the sidebar speaks
                        // the same language as the page headings it sits beside.
                        "group/nav relative block w-full rounded-lg py-2.5 ps-5 pe-3 text-start font-main text-[0.9375rem] transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage",
                        isActive(item.path)
                          ? "font-medium text-ink-strong"
                          : "text-ink-muted hover:text-ink-strong",
                      )}
                    >
                      {/* `layoutId` makes the outgoing and incoming markers
                          one object, so it travels instead of blinking. */}
                      {isActive(item.path) && (
                        <motion.span
                          layoutId="nav-marker"
                          aria-hidden="true"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          className="absolute inset-0 -z-10 rounded-lg bg-parchment/[0.06]"
                        >
                          <span className="absolute start-0 top-1/2 h-5 w-px -translate-y-1/2 rounded-full bg-sage" />
                        </motion.span>
                      )}
                      {!isActive(item.path) && (
                        <span
                          aria-hidden="true"
                          className="absolute start-0 top-1/2 h-5 w-px -translate-y-1/2 rounded-full bg-parchment/15 transition-colors group-hover/nav:bg-sage/60"
                        />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </LayoutGroup>
        </nav>
        <Divider />
        <motion.div
          className="cv mt-4 text-center px-4"
          whileTap={{ scale: 0.98 }}
        >
          <a
            href={profileInfo?.cv}
            target="_blank"
            download
            className="flex w-full items-center justify-center gap-2 rounded-full border border-parchment/15 py-2.5 px-4 text-center text-sm font-medium text-ink-body transition-colors hover:border-sage/60 hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            onClick={handleDownloadCV}
          >
            Download CV
          </a>
        </motion.div>
        <Divider />
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isMobile ? 0.3 : 1 }}
      >
        <p className="px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          All rights reserved &copy; {new Date().getFullYear()} Mahmoud Mohamed
        </p>
      </motion.div>
    </motion.aside>
  );
};
