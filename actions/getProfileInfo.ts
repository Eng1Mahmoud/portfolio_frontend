"use server";
import { Fetch } from "@/fetch/Fetch";
import { IuserInfoResponse } from "./../types/apiResponses";
import { IuserInfo } from "@/types/general";
export async function getProfileInfo(): Promise<IuserInfo | undefined> {
  const response = await Fetch<IuserInfoResponse, null>({
    endpoint: "profile",
    method: "GET",
    tags: ["info"],
  });
  return (
    response?.data?.info || {
      userName: "",
      title: "",
      bio: "",
      github: "",
      linkedin: "",
      phone1: "",
      phone2: "",
      email: "",
      address: "",
      avatar: "",
      aboutImage: "",
      cv: "",
    }
  );
}
