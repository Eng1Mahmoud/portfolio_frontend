"use server";
import { TrecommendationsSchema } from "@/zod/recommendationsSchema";
import { IactionState } from "@/types/general";
import { Fetch } from "@/fetch/Fetch";
import { revalidateTag } from "next/cache";
import type { GeneralResponse } from "@/types/apiResponses";
import { withNormalisedOrder } from "@/utiles/recommendation-order";

export async function editRecommendationAction(
  _state: IactionState,
  data: TrecommendationsSchema & { _id?: string },
) {
  const { _id, ...body } = data;
  const response = await Fetch<GeneralResponse, TrecommendationsSchema>({
    endpoint: `recommendations/${_id}`,
    method: "PUT",
    body: withNormalisedOrder(body),
    requiresAuth: true,
  });

  if (response.success) {
    revalidateTag("recommendation");
  }
  return response;
}
