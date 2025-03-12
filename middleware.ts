import type { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import runMiddlewares from "@/middleware/runMiddlewares";

export default async function middleware(request: NextRequest) {
  return await runMiddlewares(request, [authMiddleware]);
}
