"use server";
import { Fetch } from "@/fetch/Fetch";
import { GeneralResponse } from "./../types/apiResponses";
import { IactionState } from "@/types/general";
import { revalidateTag } from "next/cache";
export async function deleteSkillById(_state: IactionState, id: string) {
  const response = await Fetch<GeneralResponse, null>({
    endpoint: "skills",
    method: "Delete",
    param: id,
  });
  if (response.success) {
    revalidateTag("skills");
  }
  return response;
}
