"use server";
import { Fetch } from "@/fetch/Fetch";
import { SkillByIdResponse } from './../types/apiResponses';
import { ISkill } from "@/types/general";
export async function getSkillById(id: string): Promise<ISkill | undefined>{
  const response = await Fetch<SkillByIdResponse, null>({
    endpoint: "skills",
    method: "GET",
    param: id,
    tags: ["skillById"],
  });

  return response?.data?.skill ;
}