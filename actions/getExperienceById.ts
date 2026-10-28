"use server";
import { Fetch } from "@/fetch/Fetch";
import { ExperienceByIdResponse } from "./../types/apiResponses";
import { IExperience } from "@/types/general";
export async function getExperienceById(
  id: string,
): Promise<IExperience | undefined> {
  const response = await Fetch<ExperienceByIdResponse, null>({
    endpoint: `experience/${id}`,
    method: "GET",
    tags: ["experience"],
  });

  return response?.data?.experience;
}
