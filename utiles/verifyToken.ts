import { jwtVerify } from "jose/jwt/verify";
import { CustomJwtPayload } from "@/types/jwt";

// `jose` is used instead of `jsonwebtoken` because middleware runs on the
// edge runtime, where node's crypto module is unavailable.
const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
};

/**
 * Verifies a token's signature and expiry and returns its payload.
 *
 * Returns null for anything untrusted: a bad signature, an expired token, a
 * malformed token, or a missing JWT_SECRET. Callers must treat null as
 * "not authenticated" — never as "carry on".
 */
export const verifyToken = async (
  token: string,
): Promise<CustomJwtPayload | null> => {
  const secret = getSecret();
  if (!secret) {
    console.error("JWT_SECRET is not set — refusing to authorize any request.");
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as CustomJwtPayload;
  } catch {
    // Invalid signature, expired, or malformed.
    return null;
  }
};
