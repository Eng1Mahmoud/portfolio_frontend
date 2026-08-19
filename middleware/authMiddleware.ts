import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/utiles/verifyToken";
import { routes } from "@/middleware/helper/RolesAndRoutes";
import type { Role } from "@/types/authRoute";

export async function authMiddleware(
  request: NextRequest,
  response: NextResponse | null,
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  let userRole: Role = "guest";
  let tokenIsInvalid = false;

  if (token) {
    // Signature and expiry are verified here. Decoding alone would let anyone
    // hand-craft a cookie claiming `role: "admin"` and reach the dashboard.
    const payload = await verifyToken(token);
    if (payload?.role) {
      userRole = payload.role;
    } else {
      tokenIsInvalid = true;
    }
  }

  const route = routes.find((route) => pathname.startsWith(route.path));
  if (!route) return response || NextResponse.next(); // if no route found, continue to next middleware

  if (!route.roles.includes(userRole)) {
    const redirect = NextResponse.redirect(new URL(`/`, request.url));
    // Clear a rejected token so the browser stops replaying it every request.
    if (tokenIsInvalid) redirect.cookies.delete("token");
    return redirect;
  }

  return response || NextResponse.next();
}
