// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://04e9a0cd8e7193288124ab69d1e56cc0@o4508964975607808.ingest.us.sentry.io/4508964991270912",

  integrations: [
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 1,
   enabled: process.env.NODE_ENV === "production",

  replaysSessionSampleRate: 1.0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
