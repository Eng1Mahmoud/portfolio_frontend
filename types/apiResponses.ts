import { ISkill,IuserInfo } from "./general";
// login response
export interface LoginResponse {
  token: string;
  message: string;
}

// update info response
export interface UpdateInfoResponse {
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
