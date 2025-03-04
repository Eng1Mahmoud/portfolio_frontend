import type { ApiResponse, IFetch } from "@/types/fetch";
import { cookies } from "next/headers";
export async function Fetch<R, I>({
  endpoint,
  method,
  body,
  tags,
  param,
}: IFetch<I>): Promise<ApiResponse<R>> {
  try {
    const token = (await cookies()).get("token")?.value;
    const baseUrl = process.env.API_URL;
    const apiUrl = param
      ? `${baseUrl}/${endpoint}/${param}`
      : `${baseUrl}/${endpoint}`;
    const res = await fetch(`${apiUrl}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
      cache: method === "GET" ? "force-cache" : "no-store",
      ...(tags && { next: { tags } }),
    });
    if (!res.ok) {
      try {
        const errorData = await res.json();
        return {
          success: false,
          message:
            errorData.message || `Error: ${res.status} ${res.statusText}`,
        };
      } catch {
        return {
          success: false,
          message: `Error: ${res.status} ${res.statusText}`,
        };
      }
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Success",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
