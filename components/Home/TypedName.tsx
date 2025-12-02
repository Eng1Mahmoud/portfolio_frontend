"use client";
import { IuserInfo } from "@/types/general";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TypedName = ({ profileInfo }: { profileInfo: IuserInfo }) => {
  const [name, setName] = useState("");
  const typedName =
    "I am " + (profileInfo?.userName.split(" ").slice(0, 1).join("") || "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= typedName.length) {
        setName(typedName.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [typedName]);

  return (
    <div className="relative text-center">
      <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
        Hi,{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {name}
        </span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-10 md:h-16 lg:h-20 ml-2 bg-cyan-400 align-middle rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        />
      </h1>
    </div>
  );
};
