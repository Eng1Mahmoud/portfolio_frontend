import { z } from "zod";

export const contactUsSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type IContactUs = z.infer<typeof contactUsSchema>;
