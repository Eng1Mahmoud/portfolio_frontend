"use server";
import { Fetch } from "@/fetch/Fetch";
import { ExperienceResponse } from "./../types/apiResponses";
import { IExperience } from "@/types/general";
export async function getAllExperiences(): Promise<IExperience[] | undefined> {
  const response = await Fetch<ExperienceResponse, null>({
    endpoint: "experience",
    method: "GET",
    tags: ["experience"],
  });

  return response?.data?.experiences;
}
