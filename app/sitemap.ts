import { MetadataRoute } from "next";
import { siteUrl } from "@/utiles/site";

// Only the single public page is canonical; legacy section URLs redirect.
const routes = [{ path: "/", priority: 1 }];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
