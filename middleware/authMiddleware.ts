import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "@/utiles/decodeToken";
import { routes } from "@/middleware/helper/RolesAndRoutes";
import type { Role } from "@/types/authRoute";

export async function authMiddleware(
  request: NextRequest,
  response: NextResponse | null
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  let userRole: Role = "guest";

  if (token) {
    try {
      const decodedToken = decodeToken(token);
      if (decodedToken?.role) {
        userRole = decodedToken.role;
      }
    } catch {
      // if token is invalid, redirect to home
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  const route = routes.find((route) => pathname.startsWith(route.path));
  if (!route) return response || NextResponse.next(); // if no route found, continue to next middleware

  if (!route.roles.includes(userRole)) {
    return NextResponse.redirect(new URL(`/`, request.url)); //if route found but user is not authorized, redirect to home
  }

  return response || NextResponse.next();
}
