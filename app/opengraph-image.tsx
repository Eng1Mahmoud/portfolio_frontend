import { renderOgImage, ogAlt, ogContentType, ogSize } from "@/utiles/og-image";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { getProfileImageUrl } from "@/utiles/site";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpengraphImage() {
  const profileInfo = await getProfileInfo();

  return renderOgImage(getProfileImageUrl(profileInfo?.avatar));
}
