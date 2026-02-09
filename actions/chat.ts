"use server";

import { Fetch } from "@/fetch/Fetch";

export async function sendChatMessage(message: string) {
  const response = await Fetch<{ message: string }, { message: string }>({
    endpoint: "chat",
    method: "POST",
    body: { message },
  });

  return response;
}
