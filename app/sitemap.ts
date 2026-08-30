import { MetadataRoute } from "next";
import { siteUrl } from "@/utiles/site";

// Keep in sync with utiles/aside-links.ts
const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/skills", priority: 0.8 },
  { path: "/projects", priority: 0.9 },
  { path: "/experience", priority: 0.8 },
  { path: "/education", priority: 0.6 },
  { path: "/recommendations", priority: 0.7 },
  { path: "/contact-us", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
