"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextAreaProps } from "@/types/forms";
import clsx from "clsx";
import { motion } from "framer-motion";

const TextArea = ({ name, label, rows = 4, className = "" }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileTap={{ scale: 0.98 }}
        animate={{
          scale: isHovered ? 1.01 : 1,
          boxShadow: isHovered ? "0 4px 12px rgba(59, 130, 246, 0.15)" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <textarea
          {...register(name)}
          rows={rows}
          className={clsx(
            "w-full px-4 py-3 rounded-lg",
            "border-2 border-gray-700/50",
            "bg-gray-800/30 backdrop-blur-sm",
            "text-gray-200 placeholder-gray-400",
            "transition-all duration-300",
            "focus:outline-none focus:border-blue-500",
            "focus:ring-2 focus:ring-blue-500/20",
            "hover:border-gray-600",
            "resize-none",
            errors[name] && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          placeholder={label}
        />
      </motion.div>

      {errors[name] && (
        <motion.p
          className="text-red-500 text-sm pl-2 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
          {errors[name]?.message as string}
        </motion.p>
      )}
    </motion.div>
  );
};

export default TextArea;
