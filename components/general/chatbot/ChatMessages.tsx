import React from "react";
import { clsx } from "clsx";
import { Message } from "@/hooks/useChat";

import ReactMarkdown from "react-markdown";

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
    <div className="scrollBar flex-1 overflow-y-auto p-4 space-y-4 bg-surface-base/60 antialiased font-sans">
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
                ? "bg-sage text-surface-base rounded-tr-none"
                : "bg-parchment/5 text-ink-body border border-parchment/10 rounded-tl-none",
            )}
          >
            {/*
              The two bubbles need opposite prose colours. `prose-invert` sets
              a light body colour for dark backgrounds, which is right for the
              assistant's bubble and was leaving the sent message at 1.6:1 —
              light text on a light sage fill, effectively invisible. The
              parent's `text-surface-base` could not fix it, because prose
              sets the colour on the paragraph itself.
            */}
            <div
              className={clsx(
                "prose prose-sm max-w-none prose-p:leading-relaxed",
                msg.sender === "user"
                  ? "prose-headings:text-surface-base prose-p:text-surface-base prose-strong:text-surface-base prose-li:text-surface-base prose-code:text-surface-base prose-a:text-sage-deepest"
                  : "prose-invert prose-a:text-sage",
              )}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
          <span className="text-[10px] text-ink-muted mt-1 px-1">
            {msg.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-2 text-ink-muted text-sm italic">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-ink-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-ink-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-ink-muted rounded-full animate-bounce" />
          </div>
          Assistant is thinking...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
