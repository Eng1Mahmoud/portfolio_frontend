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
    <div className="p-4 bg-surface-card border-t border-parchment/10 flex gap-2 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Type your message..."
        className="flex-1 bg-parchment/5 text-ink-body placeholder-ink-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage/40 transition-all border border-parchment/10"
      />
      <button
        onClick={onSend}
        aria-label="Send message"
        disabled={isLoading || !input.trim()}
        className="w-10 h-10 rounded-full bg-sage text-surface-base flex items-center justify-center hover:bg-sage-bright transition-all shadow-md disabled:bg-parchment/10 disabled:text-ink-muted disabled:shadow-none"
      >
        <IoSend size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
