import React from "react";
import { clsx } from "clsx";
import { Message } from "@/hooks/useChat";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={clsx(
            "flex flex-col max-w-[85%]",
            msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start",
          )}
        >
          <div
            className={clsx(
              "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.sender === "user"
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none",
            )}
          >
            {msg.text}
          </div>
          <span className="text-[10px] text-gray-400 mt-1 px-1">
            {msg.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm italic">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
          </div>
          Assistant is thinking...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
