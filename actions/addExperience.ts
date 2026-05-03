"use server";
import { TexperienceSchema } from "@/zod/experienceSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function addExperienceAction(
  _state: IactionState,
  data: TexperienceSchema,
) {
  const processedData = {
    ...data,
    skills:
      typeof data.skills === "string"
        ? data.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : data.skills || [],
  };
  const response = await Fetch<GeneralResponse, TexperienceSchema>({
    endpoint: "experience",
    method: "POST",
    body: processedData,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("experience");
  }
  return response;
}
