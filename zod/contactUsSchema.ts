import { z } from "zod";
export const contactUsSchema = z.object({
  userName: z.string().trim().min(2, "Please enter your name (at least 2 characters).").max(100, "Please keep your name under 100 characters."),
  email: z.string().trim().min(1, "Please enter your email address.").max(254, "Please enter a shorter email address.").email("Please enter a valid email address, such as name@example.com."),
  phone: z.string().trim().min(1, "Please enter your phone number.").max(30, "Please enter a shorter phone number.").regex(/^\+?[\d\s().-]+$/, "Use digits and an optional country code for your phone number.").refine(value => { const digits = value.replace(/\D/g, ""); return digits.length >= 7 && digits.length <= 15; }, "Please enter a phone number with 7 to 15 digits."),
  message: z.string().trim().min(10, "Please write a message of at least 10 characters.").max(5000, "Please keep your message under 5,000 characters."),
});

export type TcontactUsSchema = z.infer<typeof contactUsSchema>;
