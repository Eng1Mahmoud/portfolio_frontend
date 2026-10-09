"use server";
import { contactUsSchema, TcontactUsSchema } from "@/zod/contactUsSchema";
import { IactionState } from "../types/general";
import emailjs from "@emailjs/nodejs";
export async function contactUs(_state: IactionState, data: TcontactUsSchema) {
  const parsed = contactUsSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check your details and try again." };
  }
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return { success: false, message: "Your message could not be sent right now. Please contact me using the email link, or try again later." };
  }
  try {
    const templateParams = {
      // Fallback so a missing/renamed env var can't silently send a blank name.
      to_name: process.env.EMAILJS_TO_NAME ?? "Mahmoud",
      from_name: parsed.data.userName,
      from_email: parsed.data.email,
      reply_to: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    };

    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      {
        publicKey,
        privateKey,
      },
    );

    return {
      success: true,
      message: "Thank you! Your message was sent successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Your message could not be sent. Your details are still here — please try again, or contact me using the email link.",
    };
  }
}
