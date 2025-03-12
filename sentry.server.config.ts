import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  tracesSampleRate: 1.0,
  debug: false,
});
