import React from "react";
import { IoSend } from "react-icons/io5";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSend,
  isLoading,
}) => {
  return (
    <div className="p-4 bg-surface-card border-t border-white/10 flex gap-2 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Type your message..."
        className="flex-1 bg-white/5 text-gray-200 placeholder-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border border-white/10"
      />
      <button
        onClick={onSend}
        aria-label="Send message"
        disabled={isLoading || !input.trim()}
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-md disabled:bg-white/10 disabled:text-gray-500 disabled:shadow-none"
      >
        <IoSend size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
