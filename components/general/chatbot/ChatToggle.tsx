import React from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { clsx } from "clsx";

interface ChatToggleProps {
  onClick: () => void;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label="Open chat assistant"
      className={clsx(
        "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
        "bg-gradient-to-br from-sage to-sage-dim text-surface-base",
      )}
    >
      <IoChatbubbleEllipses size={30} aria-hidden="true" />
    </motion.button>
  );
};
