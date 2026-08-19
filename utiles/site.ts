// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in the environment to override (e.g. preview deploys).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://dev-mahmoud-portfolio.vercel.app";

export const siteName = "Mahmoud Mohamed | Portfolio";

export const siteDescription =
  "Frontend Engineer specializing in React and Next.js, building responsive, high-performance web applications.";
