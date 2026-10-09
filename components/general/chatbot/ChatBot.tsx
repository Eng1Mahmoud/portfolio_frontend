"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatToggle } from "./ChatToggle";

const ChatBot: React.FC = () => {
  const {
    isOpen,
    toggleChat,
    closeChat,
    input,
    setInput,
    messages,
    isLoading,
    messagesEndRef,
    handleSend,
  } = useChat();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio-chat-state", { detail: isOpen }));
    return () => { window.dispatchEvent(new CustomEvent("portfolio-chat-state", { detail: false })); };
  }, [isOpen]);

  return (
    <div className="portfolio-chat fixed z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="portfolio-chat-window bg-surface-card rounded-lg shadow-pinned flex flex-col overflow-hidden border border-sage/25"
          >
            <ChatHeader onClose={closeChat} />
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={handleSend}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && <ChatToggle onClick={toggleChat} />}
    </div>
  );
};

export default ChatBot;
