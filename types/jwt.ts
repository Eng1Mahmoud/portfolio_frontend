import { JwtPayload } from "jsonwebtoken";
import { Role } from "@/types/authRoute";

// Define what our JWT token contains
export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: Role;
}