import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "dev-mahmoud.sirv.com",
      },
      {
        protocol: "https",
        hostname: "dev-mahmoud.sirv.com/**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "my-portfolio-70",
  project: "dev-mahmoud-portfolio",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
