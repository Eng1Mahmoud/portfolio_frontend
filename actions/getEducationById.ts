"use server";
import { Fetch } from "@/fetch/Fetch";
import { EducationByIdResponse } from "./../types/apiResponses";
import { IEducation } from "@/types/general";
export async function getEducationById(
  _id: string,
): Promise<IEducation | undefined> {
  const response = await Fetch<EducationByIdResponse, null>({
    endpoint: `education/${_id}`,
    method: "GET",
    tags: ["education"],
  });

  return response?.data?.education;
}
