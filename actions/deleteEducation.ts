"use server";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";

export async function deleteEducationAction(_state: IactionState, _id: string) {
  const response = await Fetch<GeneralResponse, null>({
    endpoint: `education/${_id}`,
    method: "DELETE",
    requiresAuth: true,
  });

  if (response.success) {
    revalidateTag("education");
  }
  return response;
}
