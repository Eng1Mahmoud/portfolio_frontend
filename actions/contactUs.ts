"use server";
import { IContactUs } from "./../zod/contactUsSchema";
import { IactionState } from "./../types/types";

export async function contactUs(_state: IactionState, data: IContactUs) {
  console.log(data);
  // Simulate a 5 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return { message: "Message sent successfully", success: true };
}
