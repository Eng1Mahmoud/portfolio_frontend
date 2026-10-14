// Sentry (error tracing) and PostHog (analytics) are loaded only after the
// page has finished loading and the browser is idle, so their large bundles
// never compete with the first paint or the first taps on a phone.
// The DSN must be NEXT_PUBLIC_ to reach the browser.

const whenIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const run = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(cb, { timeout: 4000 })
      : setTimeout(cb, 2500);
  const later = () => setTimeout(run, 3000);
  if (document.readyState === "complete") later();
  else window.addEventListener("load", later, { once: true });
};

whenIdle(() => {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      tracesSampleRate: 0.2,
      debug: false,
    });
    Sentry.lazyLoadIntegration("replayIntegration")
      .then((replay) => Sentry.addIntegration(replay()))
      .catch(() => {});
  });
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
    });
  });
});
