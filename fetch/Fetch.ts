import type { ApiResponse, IFetch } from "@/types/fetch";
import { cookies } from "next/headers";
export async function Fetch<R, I>({ endpoint, method, body, tags }: IFetch<I>): Promise<ApiResponse<R>> {
  try {
    const token = (await cookies()).get("token")?.value;
    const baseUrl = process.env.API_URL ;
    
    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
      cache: method === "GET" ? "force-cache" : "no-store",
      next: {
        tags: tags,
      },
    });
    console.log("Fetching:", endpoint, "with tags:", tags);
    if (!res.ok) {
      try {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || `Error: ${res.status} ${res.statusText}`,
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
      message: data.message || 'Success',
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
