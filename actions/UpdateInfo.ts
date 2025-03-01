"use server";
import { IuserInfo } from "../zod/userInfoSchema";
import { IactionState } from "../types/general";

export async function updateUser(_state: IactionState, data: IuserInfo) {
  try {
    const res = fetch("http://localhost:10000/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
    return {
      success: true,
      message: "Success",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
