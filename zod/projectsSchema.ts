import { z } from "zod";
export const projectsSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "project title required"),
  description: z.string().min(1, "project description required"),
  imageUrl: z.string().min(1, "image required").url("Invalid URL"),
  demoLink: z
    .string()
    .optional()
    .refine((val) => !val || val === "" || /^https?:\/\/.+/.test(val), {
      message: "Invalid URL",
    })
    .transform((val) => (val === "" ? undefined : val)),
  githubLink: z
    .string()
    .optional()
    .refine((val) => !val || val === "" || /^https?:\/\/.+/.test(val), {
      message: "Invalid URL",
    })
    .transform((val) => (val === "" ? undefined : val)),
  // Stack shown on the project card. Optional so existing projects, saved
  // before the field existed, still validate.
  technologies: z.array(z.string().min(1)).optional(),
  order: z.coerce.number().optional(),
});

export type TprojectsSchema = z.infer<typeof projectsSchema>;
