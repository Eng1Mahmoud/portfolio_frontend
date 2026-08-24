"use server";
import { TrecommendationsSchema } from "@/zod/recommendationsSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
import { withNormalisedOrder } from "@/utiles/recommendation-order";

export async function addRecommendationAction(
  _state: IactionState,
  data: TrecommendationsSchema,
) {
  const response = await Fetch<GeneralResponse, TrecommendationsSchema>({
    endpoint: "recommendations",
    method: "POST",
    body: withNormalisedOrder(data),
    requiresAuth: true,
  });

  if (response.success) {
    revalidateTag("recommendation");
  }
  return response;
}
