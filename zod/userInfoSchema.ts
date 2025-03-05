import { z } from "zod";
export const userInfoSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  phone1: z.string().min(1, "Phone 1 is required"),
  phone2: z.string(),
  bio: z.string().min(1, "Message is required"),
  avatar: z.string().min(1, "Avatar is required").url("Invalid avatar url"),
  aboutImage: z
    .string()
    .min(1, "About image is required")
    .url("Invalid about image url"),
  cv: z.string().min(1, "CV is required").url("Invalid cv url"),
  github: z.string().min(1, "Github is required").url("Invalid github url"),
  linkedin: z
    .string()
    .min(1, "Linkedin is required")
    .url("Invalid linkedin url"),
});

export type TuserInfoSchema = z.infer<typeof userInfoSchema>;
