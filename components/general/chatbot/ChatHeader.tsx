import React from "react";
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-sage-deep to-sage-dim p-4 flex justify-between items-center text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-parchment/20 flex items-center justify-center backdrop-blur-sm">
          <IoChatbubbleEllipses size={22} />
        </div>
        <div>
          <h3 className="font-bold text-sm">Mahmoud&apos;s Assistant</h3>
          <p className="text-[10px] text-ink-body flex items-center gap-1">
            <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
            Online
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close chat"
        className="p-1 hover:bg-parchment/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <IoClose size={24} aria-hidden="true" />
      </button>
    </div>
  );
};
