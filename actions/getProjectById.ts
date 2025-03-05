"use server";
import { Fetch } from "@/fetch/Fetch";
import { ProjectByIdResponse } from './../types/apiResponses';
import { Iproject } from "@/types/general";
export async function getProjectById(id: string): Promise<Iproject | undefined>{
  const response = await Fetch<ProjectByIdResponse, null>({
    endpoint: "projects",
    method: "GET",
    param: id,
    tags: ["projectById"],
  });

  return response?.data?.project ;
}