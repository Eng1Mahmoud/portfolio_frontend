"use server";
import { Fetch } from "@/fetch/Fetch";
import { ProjectsResponse } from "./../types/apiResponses";
import { Iproject } from "@/types/general";
export async function getAllProjects(): Promise<Iproject[] | undefined> {
  const response = await Fetch<ProjectsResponse, null>({
    endpoint: "projects",
    method: "GET",
    tags: ["projects"],
  });

  return response?.data?.projects;
}
