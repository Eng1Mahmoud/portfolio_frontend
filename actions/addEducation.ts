"use server";
import { TeducationSchema } from "@/zod/educationSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function addEducationAction(
  _state: IactionState,
  data: TeducationSchema,
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
  const response = await Fetch<GeneralResponse, TeducationSchema>({
    endpoint: "education",
    method: "POST",
    body: processedData,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("education");
  }
  return response;
}
