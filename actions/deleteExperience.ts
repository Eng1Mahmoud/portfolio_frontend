"use server";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";

export async function deleteExperienceAction(
  _state: IactionState,
  _id: string,
) {
  const response = await Fetch<GeneralResponse, null>({
    endpoint: `experience/${_id}`,
    method: "DELETE",
    requiresAuth: true,
  });

  if (response.success) {
    revalidateTag("experience");
  }
  return response;
}
