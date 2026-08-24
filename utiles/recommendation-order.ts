import { TrecommendationsSchema } from "@/zod/recommendationsSchema";

/**
 * A blank order field means "no opinion", not position zero. Dropping the key
 * lets the backend apply its own default on create, and leaves the stored value
 * untouched on edit — sending 0 instead would quietly promote the entry to the
 * front of the list.
 */
export const withNormalisedOrder = (data: TrecommendationsSchema) => {
  const { order, ...rest } = data;

  if (order === "" || order === undefined) return rest;

  return { ...rest, order: Number(order) };
};
