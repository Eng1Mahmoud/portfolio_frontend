let client: Promise<typeof import("posthog-js").default> | undefined;

export function getPostHog() {
  if (!client) {
    client = import("posthog-js")
      .then(({ default: posthog }) => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        if (key)
          posthog.init(key, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            defaults: "2026-01-30",
          });
        return posthog;
      })
      .catch((error) => {
        client = undefined;
        throw error;
      });
  }
  return client;
}

export function captureEvent(
  name: string,
  properties?: Record<string, unknown>,
) {
  void getPostHog()
    .then((client) => client.capture(name, properties))
    .catch(() => {
      // Analytics must never prevent navigation or other user actions.
    });
}
