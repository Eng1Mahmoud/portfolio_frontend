"use server";
import { Fetch } from "@/fetch/Fetch";
import { RecommendationByIdResponse } from "@/types/apiResponses";
import { IRecommendation } from "@/types/general";

export async function getRecommendationById(
  _id: string,
): Promise<IRecommendation | undefined> {
  const response = await Fetch<RecommendationByIdResponse, null>({
    endpoint: `recommendations/${_id}`,
    method: "GET",
    tags: ["recommendation"],
  });

  return response?.data?.recommendation;
}
