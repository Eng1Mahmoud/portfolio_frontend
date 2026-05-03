import { z } from "zod";

export const experienceSchema = z.object({
  _id: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  workType: z.string().optional(),
  skills: z.union([z.string(), z.array(z.string())]).optional(),
  image: z.string().optional(),
  description: z.string().optional(),
});

export type TexperienceSchema = z.infer<typeof experienceSchema>;
