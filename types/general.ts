import { TskillsSchema } from "@/zod/skillsSchema";
import { TuserInfoSchema } from "@/zod/userInfoSchema";
import { TprojectsSchema } from "@/zod/projectsSchema";
// Interface for toast options
export interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  message: string;
}
// Interface for form state
export interface IactionState {
  message: string;
  success: boolean;
}
// skill interface
export interface ISkill extends TskillsSchema {
  _id?: string;
}
// user info interface
export interface IuserInfo extends TuserInfoSchema {
  _id?: string;
}

export interface Iproject extends TprojectsSchema {
  _id?: string;
}

export interface IExperience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
}
