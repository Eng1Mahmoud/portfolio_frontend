"use server";
import { TskillsSchema } from "@/zod/skillsSchema";
import { IactionState, ISkill } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function editSkillAction(_state: IactionState, data: ISkill) {
  const { id, ...body } = data;
  const response = await Fetch<GeneralResponse, TskillsSchema>({
    endpoint: "skills",
    method: "PUT",
    body,
    param: id,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("skillById");
    revalidateTag("skills");
  }
  return response;
}
