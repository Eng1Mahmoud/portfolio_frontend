import { IuserInfo } from "@/zod/userInfoSchema";
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