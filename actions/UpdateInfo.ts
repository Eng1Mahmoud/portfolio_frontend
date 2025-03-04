"use server";
import { TuserInfoSchema } from "../zod/userInfoSchema";
import { IactionState } from "../types/general";
import { Fetch } from "@/fetch/Fetch";
import { GeneralResponse } from "@/types/apiResponses";
import { revalidateTag } from "next/cache";
export async function updateUser(_state: IactionState, data: TuserInfoSchema) {
  const response = await Fetch<GeneralResponse, TuserInfoSchema>({
    endpoint: "profile",
    method: "PUT",
    body: data,
  });
  if (response.success) {
    revalidateTag("user-info")
  }
  
  return response;
}
