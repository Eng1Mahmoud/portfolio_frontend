import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1,
  debug: false,
});
