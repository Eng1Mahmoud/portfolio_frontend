import { Metadata } from "next";

// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in the environment to override (e.g. preview deploys).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.mahmoud-mohamed.dev";

export const siteName = "Mahmoud Mohamed | Portfolio";

/**
 * Leads with the role people actually search for. "Software Engineer" stays
 * the headline; "Frontend" and "Full-Stack" follow because they are different
 * queries, and a description that only says "portfolio" matches neither.
 */
export const siteDescription =
  "Mahmoud Mohamed — Software Engineer from Egypt with 3+ years building scalable, responsive, SEO-friendly web applications. Frontend with React.js, Next.js, TypeScript and Vue.js; full-stack with Node.js, Express and MongoDB.";

/** The name to beat in search is generic, so the title carries the role. */
export const siteTitle =
  "Mahmoud Mohamed | Software Engineer";

/**
 * Feeds both the `keywords` meta tag and the Person schema's `knowsAbout`.
 * Ordered roughly by how much traffic each term is worth, since some
 * consumers truncate.
 */
export const siteKeywords = [
  "Mahmoud Mohamed",
  "Software Engineer",
  "Full-Stack Developer",
  "Full-Stack Engineer",
  "Frontend Software Engineer",
  "Frontend Engineer",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "TypeScript",
  "JavaScript",
  "Vue.js",
  "Redux",
  "Zustand",
  "TanStack Query",
  "Tailwind CSS",
  "Web Developer Egypt",
  "Software Engineer Egypt",
  "portfolio",
];

export const fallbackProfileImageUrl =
  process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL?.trim() ||
  "https://dev-mahmoud.sirv.com/portfolio/MAHMOUD.png";

// Explicit leaf metadata prevents Next.js from dropping inherited share images.
// Bump `v` whenever the photo changes so link-preview caches fetch it again.
export const socialPortraitUrl =
  "https://dev-mahmoud.sirv.com/portfolio/MAHMOUD.png?w=1200&h=630&scale.option=fit&canvas.width=1200&canvas.height=630&canvas.color=171A16&format=jpg&v=2";

export const getProfileImageUrl = (avatar?: string) =>
  avatar?.trim() || fallbackProfileImageUrl;

export type PublicPageMetadata = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  type?: "website" | "profile";
};

export const buildPublicPageMetadata = ({
  title,
  description,
  path,
  ogTitle,
  type = "website",
}: PublicPageMetadata): Metadata => ({
  title: path === "/" ? { absolute: title } : title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: ogTitle ?? title,
    description,
    url: path,
    type,
    images: [{ url: socialPortraitUrl, width: 1200, height: 630, alt: "Mahmoud Mohamed — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialPortraitUrl],
    title: ogTitle ?? title,
    description,
  },
});
