"use server";
import { TeducationSchema } from "@/zod/educationSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
export async function editEducationAction(
  _state: IactionState,
  data: TeducationSchema & { _id?: string },
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
  const response = await Fetch<GeneralResponse, TeducationSchema>({
    endpoint: `education/${_id}`,
    method: "PUT",
    body: processedData,
    requiresAuth: true,
  });
  if (response.success) {
    revalidateTag("education");
  }
  return response;
}
