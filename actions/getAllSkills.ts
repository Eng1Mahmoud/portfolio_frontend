"use server";
import { Fetch } from "@/fetch/Fetch";
import { SkillsResponse } from './../types/apiResponses';
import { ISkill } from "@/types/general";
export async function getAllSkills(): Promise<ISkill[] | undefined>{
  const response = await Fetch<SkillsResponse, null>({
    endpoint: "skills",
    method: "GET",
    tags: ["skills"],
  });

  return response?.data?.skills  ;
}