import { z } from "zod";

export const skillsSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "skill name required"),
  imageUrl: z.string().min(1, "image required").url("Invalid URL"),
});

export type TskillsSchema = z.infer<typeof skillsSchema>;
