import { TskillsSchema } from "@/zod/skillsSchema";
import { TuserInfoSchema } from "@/zod/userInfoSchema";
import { TprojectsSchema } from "@/zod/projectsSchema";
import { TexperienceSchema } from "@/zod/experienceSchema";
import { TeducationSchema } from "@/zod/educationSchema";
import { TrecommendationsSchema } from "@/zod/recommendationsSchema";
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
  id?: string;
}
// user info interface
export interface IuserInfo extends TuserInfoSchema {
  _id?: string;
}

export interface Iproject extends TprojectsSchema {
  id?: string;
}

export interface IExperience extends TexperienceSchema {
  id?: string;
}

export interface IEducation extends TeducationSchema {
  id?: string;
}

export interface IRecommendation extends TrecommendationsSchema {
  id?: string;
}
