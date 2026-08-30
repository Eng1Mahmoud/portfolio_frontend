import { Metadata } from "next";

// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in the environment to override (e.g. preview deploys).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://dev-mahmoud-portfolio.vercel.app";

export const siteName = "Mahmoud Mohamed | Portfolio";

/**
 * Leads with the role people actually search for. "Frontend Software Engineer"
 * and "Frontend Engineer" are both spelled out because they are different
 * queries, and a description that only says "portfolio" matches neither.
 */
export const siteDescription =
  "Mahmoud Mohamed — Frontend Software Engineer from Egypt with 3+ years building scalable, responsive, SEO-friendly web applications with React.js, Next.js, TypeScript, Vue.js and TanStack Query.";

/** The name to beat in search is generic, so the title carries the role. */
export const siteTitle =
  "Mahmoud Mohamed | Frontend Software Engineer (React.js, Next.js)";

/**
 * Feeds both the `keywords` meta tag and the Person schema's `knowsAbout`.
 * Ordered roughly by how much traffic each term is worth, since some
 * consumers truncate.
 */
export const siteKeywords = [
  "Mahmoud Mohamed",
  "Frontend Software Engineer",
  "Frontend Engineer",
  "Frontend Developer",
  "Software Engineer",
  "React Developer",
  "Next.js Developer",
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Vue.js",
  "Redux",
  "Zustand",
  "TanStack Query",
  "Tailwind CSS",
  "Web Developer Egypt",
  "Frontend Engineer Egypt",
  "portfolio",
];

export const fallbackProfileImageUrl =
  process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL?.trim() || "";

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
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle ?? title,
    description,
  },
});
