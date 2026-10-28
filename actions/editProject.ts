"use server";
import { TprojectsSchema } from "@/zod/projectsSchema";
import { IactionState, Iproject } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function editProjectAction(_state: IactionState, data: Iproject) {
  const { id, ...body } = data;
  const response = await Fetch<GeneralResponse, TprojectsSchema>({
    endpoint: "projects",
    method: "PUT",
    body,
    param: id,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("projectById");
    revalidateTag("projects");
  }
  return response;
}
