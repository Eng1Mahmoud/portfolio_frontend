"use server";
import { IuserInfo } from "../zod/userInfoSchema";
import { IactionState } from "../types/general";
import { Fetch } from "@/fetch/Fetch";
import { UpdateInfoResponse } from "@/types/apiResponses";
export async function updateUser(_state: IactionState, data: IuserInfo) {
  const response = await Fetch<UpdateInfoResponse, IuserInfo>({
    endpoint: "profile",
    method: "PUT",
    body: data,
  });
  return response;
}
