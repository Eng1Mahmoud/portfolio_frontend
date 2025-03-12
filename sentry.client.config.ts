import * as Sentry from "@sentry/nextjs";
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1,
   enabled: process.env.NODE_ENV === "production",
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
