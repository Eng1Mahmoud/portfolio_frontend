import React from "react";
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <IoChatbubbleEllipses size={22} />
        </div>
        <div>
          <h3 className="font-bold text-sm">Mahmoud&apos;s Assistant</h3>
          <p className="text-[10px] text-blue-100 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Online
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        <IoClose size={24} />
      </button>
    </div>
  );
};
