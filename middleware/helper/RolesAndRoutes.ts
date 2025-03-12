import { type RouteConfig } from "@/types/authRoute";
export const routes: RouteConfig[] = [
  { path: "/auth", roles: ["guest"] },
  { path: "/dashboard", roles: ["admin"] },
];
