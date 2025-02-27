import { z } from "zod";
export const contactUsSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(1, "Message is required"),
});

export type IcontactUs = z.infer<typeof contactUsSchema>;
