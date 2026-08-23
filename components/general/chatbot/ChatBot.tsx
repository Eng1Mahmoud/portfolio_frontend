"use client";

import React from "react";
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

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-surface-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-sage/25"
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
