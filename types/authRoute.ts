export type Role = "guest" | "user" | "admin";
export interface RouteConfig {
  path: string;
  roles: Role[];
}
