/** Keep the gtag command format and queue clicks even before its SDK loads. */
export function sendGAEvent(..._args: unknown[]) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { dataLayer?: unknown[] };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  // gtag consumes Arguments commands, matching its official bootstrap.
  // eslint-disable-next-line prefer-rest-params
  analyticsWindow.dataLayer.push(arguments);
}
