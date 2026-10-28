"use server";
import { Fetch } from "@/fetch/Fetch";
import { EducationByIdResponse } from "./../types/apiResponses";
import { IEducation } from "@/types/general";
export async function getEducationById(
  id: string,
): Promise<IEducation | undefined> {
  const response = await Fetch<EducationByIdResponse, null>({
    endpoint: `education/${id}`,
    method: "GET",
    tags: ["education"],
  });

  return response?.data?.education;
}
