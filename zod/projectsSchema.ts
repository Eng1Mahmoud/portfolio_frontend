import { z } from "zod";
export const projectsSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1,"project title required"),
  description: z.string().min(1,"project description required"),
  imageUrl: z.string().min(1,"image required").url("Invalid URL"),
  demoLink: z.string().min(1,"demo link required").url("Invalid URL"),
  githubLink: z.string().min(1,"github link required").url("Invalid URL"),
});

export type TprojectsSchema = z.infer<typeof projectsSchema>;