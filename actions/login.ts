"use server";
import { LoginSchema } from "@/zod/loginSchema";
import { IactionState } from "@/types/general";
import { cookies } from "next/headers";
export async function loginAction(_state: IactionState, data: LoginSchema) {
  try {
    const res = await fetch("http://localhost:10000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: responseData.message,
      };
    }

    // Set the token in cookies
    (
      await // Set the token in cookies
      cookies()
    ).set({
      name: "token",
      value: responseData.token,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
    return {
      success: true,
      message: responseData.message,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
