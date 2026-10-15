import { getPostHog } from "@/utiles/analytics-events/posthog-client";
import * as Sentry from "@sentry/nextjs";

// Sentry (error tracing) — the DSN must be NEXT_PUBLIC_ to reach the browser.
// Session replay is lazy-loaded after the page is idle so it never competes
// with the first paint.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 0.2,
  debug: false,
});

const whenIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const run = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(cb, { timeout: 4000 })
      : setTimeout(cb, 2500);
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
};

whenIdle(() => {
  Sentry.lazyLoadIntegration("replayIntegration")
    .then((replay) => Sentry.addIntegration(replay()))
    .catch(() => {});
  // PostHog (product analytics), loaded off the critical path.
  void getPostHog().catch(() => {});
});
