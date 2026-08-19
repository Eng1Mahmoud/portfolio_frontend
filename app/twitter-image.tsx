import { renderOgImage, ogAlt, ogContentType, ogSize } from "@/utiles/og-image";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return renderOgImage();
}
