import { afterFirstInteraction } from "@/utiles/first-interaction";
import { getPostHog } from "@/utiles/analytics-events/posthog-client";
import * as Sentry from "@sentry/nextjs";

// Sentry (error tracing) — the DSN must be NEXT_PUBLIC_ to reach the browser.
// Core errors are captured immediately. Replay is an optional enhancement,
// started after interaction (or requested by an error), not during first paint.
let replayLoading: Promise<void> | undefined;
function loadReplay() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return Promise.resolve();
  if (!replayLoading) {
    replayLoading = Sentry.lazyLoadIntegration("replayIntegration")
      .then((replay) => {
        Sentry.addIntegration(
          replay({
            // Decorative frame-by-frame style mutations carry no useful replay
            // information; keep the rest of the page and interactions recorded.
            blockSelector: ".skills-orbit, .section-backdrop",
          }),
        );
      })
      .catch(() => {
        replayLoading = undefined;
      });
  }
  return replayLoading;
}
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 0.2,
  debug: false,
  beforeSend(event) {
    void loadReplay();
    return event;
  },
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

// Analytics still starts for visits without interaction; page-view coverage stays.
whenIdle(() => {
  void getPostHog().catch(() => {});
});
afterFirstInteraction(() =>
  whenIdle(() => {
    void loadReplay();
  }),
);
