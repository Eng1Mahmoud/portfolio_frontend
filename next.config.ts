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
