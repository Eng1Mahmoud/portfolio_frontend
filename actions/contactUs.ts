"use server";
import { IcontactUs } from "@/zod/contactUsSchema";
import { IactionState } from "../types/general";
import emailjs from "@emailjs/nodejs";
export async function contactUs(_state: IactionState, data: IcontactUs) {
  try {
    const templateParams = {
      to_name: process.env.EMAILJS_TO_NAME!,
      from_name: data.userName,
      from_email: data.email,
      reply_to: data.email,
      phone: data.phone,
      message: data.message,
    };

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to send message",
    };
  }
}
