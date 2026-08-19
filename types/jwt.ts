import type { JWTPayload } from "jose";
import { Role } from "@/types/authRoute";

// Define what our JWT token contains
export interface CustomJwtPayload extends JWTPayload {
  id: string;
  role: Role;
}
