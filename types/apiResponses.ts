import { ISkill,IuserInfo } from "./general";
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
  message: string;
  skills: ISkill[];
}

// skill by id response
export interface SkillByIdResponse {
  message: string;
  skill: ISkill;
}
