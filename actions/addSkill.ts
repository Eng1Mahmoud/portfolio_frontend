"use server";
import { TskillsSchema } from "@/zod/skillsSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function addSkillAction(
  _state: IactionState,
  data: TskillsSchema,
) {
  const response = await Fetch<GeneralResponse, TskillsSchema>({
    endpoint: "skills",
    method: "POST",
    body: data,
  });
  if (response.success) {
    revalidateTag("skills");
  }
  return response;
}
