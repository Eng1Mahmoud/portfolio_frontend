"use server";
import { Fetch } from "@/fetch/Fetch";
import { EducationResponse } from "./../types/apiResponses";
import { IEducation } from "@/types/general";
export async function getAllEducations(): Promise<IEducation[] | undefined> {
  const response = await Fetch<EducationResponse, null>({
    endpoint: "education",
    method: "GET",
    tags: ["education"],
  });

  return response?.data?.educations;
}
