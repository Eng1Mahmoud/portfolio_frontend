import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "@/types/jwt";

export const decodeToken = (token: string): CustomJwtPayload | null => {
  const decoded = jwt.decode(token);
  if (!decoded) return null;
  return decoded as CustomJwtPayload;
};
