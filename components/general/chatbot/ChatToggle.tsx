import React from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { clsx } from "clsx";

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
        isOpen
          ? "bg-red-500 text-white"
          : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
      )}
    >
      <IoChatbubbleEllipses size={30} />
    </motion.button>
  );
};
