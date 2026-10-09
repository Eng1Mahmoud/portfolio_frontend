import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-mahmoud.sirv.com",
        pathname: "**",
      },
    ],
  },
  // The site is one page now; old section addresses jump to their section.
  async redirects() {
    const map: Record<string, string> = {
      about: "home", "contact-us": "contact-us", education: "education",
      experience: "experience", projects: "projects",
      recommendations: "recommendations", skills: "skills",
    };
    return Object.entries(map).map(([from, to]) => ({
      source: `/${from}`, destination: `/#${to}`, permanent: true,
    }));
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export default withSentryConfig(nextConfig, {
  org: "my-portfolio-70",
  project: "dev-mahmoud-portfolio",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Off: the annotation adds data-sentry-* props to every JSX element, and
  // react-three-fiber elements (the home page's 3D orbit) reject them.
  reactComponentAnnotation: {
    enabled: false,
  },
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
