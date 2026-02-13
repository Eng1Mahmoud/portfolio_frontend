"use server";
import { TprojectsSchema } from "@/zod/projectsSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function addProjectAction(
  _state: IactionState,
  data: TprojectsSchema,
) {
  const response = await Fetch<GeneralResponse, TprojectsSchema>({
    endpoint: "projects",
    method: "POST",
    body: data,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("projects");
  }
  return response;
}
