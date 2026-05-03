import {
  Iproject,
  ISkill,
  IuserInfo,
  IEducation,
  IExperience,
} from "@/types/general";
export interface GeneralResponse {
  message: string;
}
// login response
export interface LoginResponse {
  token: string;
  message: string;
}
// get info response
export interface IuserInfoResponse {
  message: string;
  info: IuserInfo;
}
// skills response
export interface SkillsResponse {
  skills: ISkill[];
}

// skill by id response
export interface SkillByIdResponse {
  skill: ISkill;
}

export interface ProjectsResponse {
  projects: Iproject[];
}
export interface ProjectByIdResponse {
  project: Iproject;
}
export interface EducationResponse {
  educations: IEducation[];
}
export interface EducationByIdResponse {
  education: IEducation;
}
export interface ExperienceResponse {
  experiences: IExperience[];
}
export interface ExperienceByIdResponse {
  experience: IExperience;
}
