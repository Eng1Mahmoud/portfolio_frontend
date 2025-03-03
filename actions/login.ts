"use server";
import { ILogin } from "@/zod/loginSchema";
import { IactionState } from "@/types/general";
import { cookies } from "next/headers";
import { Fetch } from "@/fetch/Fetch";
import type { LoginResponse } from "@/types/apiResponses";
import { redirect } from "next/navigation";

export async function loginAction(_state: IactionState, data: ILogin) {
  const response = await Fetch<LoginResponse, ILogin>({
    endpoint: "auth/login",
    method: "POST",
    body: data,
  });
  if (response.success && response.data) {
    (await cookies()).set({
      name: "token",
      value: response.data.token,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/dashboard");
  }
}
