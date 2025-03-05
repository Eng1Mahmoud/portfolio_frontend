"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Aside } from "@/components/general/Aside";
import { IuserInfo } from "@/types/general";

export const MobileAsideToggle = ({
  profileInfo,
}: {
  profileInfo: IuserInfo;
}) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      {!isAsideOpen && (
        <button
          onClick={toggleAside}
          className={`
          lg:hidden fixed top-4 left-4 z-50 
          bg-blue-600 text-white p-2 rounded-md
          transition-all duration-300
        `}
        >
          <FaBars />
        </button>
      )}

      {/* Mobile Layout */}
      <AnimatePresence>
        {isAsideOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="
              fixed inset-0 z-50 
              lg:hidden
              w-[80%] max-w-[300px]
              rounded-r-xl
            "
          >
            <div className="h-full overflow-y-auto ">
              <Aside
                setIsAsideOpen={setIsAsideOpen}
                profileInfo={profileInfo}
              />
            </div>
            <button
              onClick={toggleAside}
              className="
                absolute top-4 right-4 
                bg-red-600 text-white p-2 rounded-md
              "
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
