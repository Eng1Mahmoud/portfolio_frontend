import { TskillsSchema } from '@/zod/skillsSchema';
import { TuserInfoSchema } from '@/zod/userInfoSchema';
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