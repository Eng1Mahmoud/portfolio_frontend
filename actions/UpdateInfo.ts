"use server";
import { IuserInfo } from "../zod/userInfoSchema";
import { IactionState } from "../types/general";
import { Fetch } from "@/fetch/Fetch";
import { UpdateInfoResponse } from "@/types/apiResponses";
import { revalidateTag } from "next/cache";
export async function updateUser(_state: IactionState, data: IuserInfo) {
  const response = await Fetch<UpdateInfoResponse, IuserInfo>({
    endpoint: "profile",
    method: "PUT",
    body: data,
  });
  if (response.success) {
    console.log("Profile updated successfully. Revalidating tag...");
    revalidateTag("user-info")
  }
  
  return response;
}
