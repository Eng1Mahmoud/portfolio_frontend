"use server";
import { TexperienceSchema } from "@/zod/experienceSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function editExperienceAction(
  _state: IactionState,
  data: TexperienceSchema & { _id?: string },
) {
  const { _id, ...body } = data;
  const processedData = {
    ...body,
    skills:
      typeof body.skills === "string"
        ? body.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : body.skills || [],
  };
  const response = await Fetch<GeneralResponse, TexperienceSchema>({
    endpoint: `experience/${_id}`,
    method: "PUT",
    body: processedData,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("experience");
  }
  return response;
}
