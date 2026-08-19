import posthog from "posthog-js";
import * as Sentry from "@sentry/nextjs";

// Sentry (error tracing) — the DSN must be NEXT_PUBLIC_ to reach the browser.
// A non-public var is `undefined` here, which silently puts the SDK in no-op mode.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1.0,
  debug: false,
});

// PostHog (product analytics)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-01-30",
  });
}
