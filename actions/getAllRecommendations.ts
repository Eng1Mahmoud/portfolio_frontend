"use server";
import { Fetch } from "@/fetch/Fetch";
import { RecommendationsResponse } from "@/types/apiResponses";
import { IRecommendation } from "@/types/general";

export async function getAllRecommendations(): Promise<
  IRecommendation[] | undefined
> {
  const response = await Fetch<RecommendationsResponse, null>({
    endpoint: "recommendations",
    method: "GET",
    tags: ["recommendation"],
  });

  return response?.data?.recommendations;
}
