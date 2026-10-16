import Script from "next/script";

export function getGoogleAnalyticsInit(gaId?: string) {
  if (!gaId || !/^G-[A-Z0-9]+$/.test(gaId)) return undefined;
  return `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`;
}

/** Download the optional SDK after page load; RootLayout queues commands. */
export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  if (!getGoogleAnalyticsInit(gaId)) return null;
  return (
    <Script
      id="portfolio-ga"
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="lazyOnload"
    />
  );
}
