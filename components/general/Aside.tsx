"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asideLinks } from "@/utiles/aside-links";
import Divider from "@/components/general/Divider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IuserInfo } from "@/types/general";
import { motion } from "framer-motion";

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
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 },
  };

  const desktopConfig = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.aside
      {...(isMobile ? mobileConfig : desktopConfig)}
      className="min-h-[100vh] max-h-[auto] w-full bg-gradient-to-b from-primary-dark to-[#1a1f3c] text-white p-6 flex flex-col items-center border-r-[6px] border-blue-500 rounded-r-xl shadow-blue-600 shadow-xl relative"
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
        <ul className="space-y-4">
          {asideLinks.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isMobile ? 0.1 * index : 0.2 * index }}
              className="w-full"
            >
              <motion.div
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.path}
                  className={`
                    block w-full py-2 px-4 rounded-md text-center transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-md shadow-blue-500/50"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm"
                    }
                  `}
                  onClick={() => setIsAsideOpen && setIsAsideOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </ul>
        <Divider />
        <motion.div
          className="cv mt-4 text-center"
          whileHover={isMobile ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            href={profileInfo?.cv}
            target="_blank"
            download
            className="block w-full py-2 px-4 rounded-md text-center 
              bg-gradient-to-r from-green-600 to-emerald-500
              hover:from-green-500 hover:to-emerald-400 
              transition-all duration-300 shadow-lg shadow-green-700/30"
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
        <p className="text-[13px] text-gray-400">
          All rights reserved &copy; {new Date().getFullYear()} Mahmoud Mohamed
        </p>
      </motion.div>
    </motion.aside>
  );
};
