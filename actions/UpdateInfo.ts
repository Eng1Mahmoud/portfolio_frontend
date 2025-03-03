"use server";
import { TuserInfoSchema } from "../zod/userInfoSchema";
import { IactionState } from "../types/general";
import { Fetch } from "@/fetch/Fetch";
import { UpdateInfoResponse } from "@/types/apiResponses";
import { revalidateTag } from "next/cache";
export async function updateUser(_state: IactionState, data: TuserInfoSchema) {
  const response = await Fetch<UpdateInfoResponse, TuserInfoSchema>({
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
