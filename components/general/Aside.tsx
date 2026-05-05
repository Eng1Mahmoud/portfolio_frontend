"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asideLinks } from "@/utiles/aside-links";
import Divider from "@/components/general/Divider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";
import clsx from "clsx";
import { handleDownloadCV } from "@/utiles/analytics-events/events";
export const Aside = ({
  setIsAsideOpen,
  profileInfo,
}: {
  setIsAsideOpen?: Dispatch<SetStateAction<boolean>>;
  profileInfo?: IuserInfo;
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
      className="h-screen overflow-y-auto w-full bg-gradient-to-b from-primary-dark to-[#1a1f3c] text-white flex flex-col items-center relative z-[100] scrollBar py-10"
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
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-400/30 transition-colors"
          animate={isMobile ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="border-[6px] border-secondary-dark rounded-full shadow-lg shadow-blue-400/50 relative">
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
          <ul className="space-y-2 px-3 sm:px-4">
            {asideLinks.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isMobile ? 0.1 * index : 0.2 * index }}
                className="w-full"
              >
                <motion.div
                  whileHover={isMobile ? {} : { scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.path}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    onClick={() => setIsAsideOpen && setIsAsideOpen(false)}
                    className={clsx(
                      "relative block w-full overflow-hidden rounded-xl py-3 px-4 text-center font-main text-[0.9375rem] font-medium tracking-wide transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark",
                      isActive(item.path)
                        ? "bg-gradient-to-r from-secondary-dark via-[#5b7ff0] to-cyan-500 text-white shadow-lg shadow-indigo-950/50 ring-1 ring-white/15 before:pointer-events-none before:absolute before:left-3 before:top-1/2 before:block before:h-8 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-white/90 before:shadow-[0_0_10px_rgba(255,255,255,0.45)] before:content-['']"
                        : [
                            "group border border-white/[0.09] bg-white/[0.04] text-text-secondary/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] backdrop-blur-[2px]",
                            "hover:border-secondary-dark/35 hover:bg-gradient-to-r hover:from-white/[0.08] hover:to-white/[0.03] hover:text-text-primary hover:shadow-md hover:shadow-secondary-dark/20",
                            "before:pointer-events-none before:absolute before:left-3 before:top-1/2 before:block before:h-0 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-gradient-to-b before:from-cyan-400 before:to-secondary-dark before:opacity-0 before:transition-all before:duration-300 before:content-['']",
                            "hover:before:h-8 hover:before:opacity-100 hover:before:shadow-[0_0_12px_rgba(34,211,238,0.35)]",
                          ],
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </nav>
        <Divider />
        <motion.div
          className="cv mt-4 text-center px-4"
          whileHover={isMobile ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            href={profileInfo?.cv}
            target="_blank"
            download
            className="block w-full rounded-xl py-3 px-4 text-center text-[0.9375rem] font-medium tracking-wide
              bg-gradient-to-r from-green-600 to-emerald-500
              hover:from-green-500 hover:to-emerald-400 
              transition-all duration-300 shadow-lg shadow-green-700/30
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
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
        <p className="text-[13px] text-gray-400 px-3">
          All rights reserved &copy; {new Date().getFullYear()} Mahmoud Mohamed
        </p>
      </motion.div>
    </motion.aside>
  );
};
