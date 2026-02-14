"use client";
import dynamic from "next/dynamic";

const ChatBotWraper = dynamic(() => import("./ChatBot"), {
  ssr: false,
});

export default ChatBotWraper;
