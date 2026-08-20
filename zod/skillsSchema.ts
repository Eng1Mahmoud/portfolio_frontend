import { z } from "zod";

/** Groups the public skills page. Free-form on the backend; these are the
 *  options offered in the dashboard. */
export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Tools",
  "Other",
] as const;

export const skillsSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "skill name required"),
  imageUrl: z.string().min(1, "image required").url("Invalid URL"),
  // Optional so the 26 skills saved before this field existed still validate.
  category: z.string().optional(),
});

export type TskillsSchema = z.infer<typeof skillsSchema>;
