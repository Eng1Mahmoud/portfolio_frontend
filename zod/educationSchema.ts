import { z } from "zod";

export const educationSchema = z.object({
  _id: z.string().optional(),
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  description: z.string().optional(),
  skills: z.union([z.string(), z.array(z.string())]).optional(),
  image: z.string().optional(),
});

export type TeducationSchema = z.infer<typeof educationSchema>;
