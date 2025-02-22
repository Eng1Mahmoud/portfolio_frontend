import { z } from "zod";

export const contactUsSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(1, "Message is required"),
});

export type IContactUs = z.infer<typeof contactUsSchema>;
