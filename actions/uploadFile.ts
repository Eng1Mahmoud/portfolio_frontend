"use server";
import { cookies } from "next/headers";
export async function uploadFileAction(formData: FormData) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(`${process.env.API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "Upload failed",
      };
    }
    return {
      success: true,
      url: data.url,
      message: data.message,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
