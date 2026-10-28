import localFont from "next/font/local";

// Prepared from official Fontshare URLs by predev/prebuild. Keep the font
// binaries out of the public repository; see scripts/README.md.
// On a slow first visit, keep the metric-adjusted fallback instead of a late
// font swap that repaints the largest text. Cached fonts keep the same design.
export const displayFont = localFont({
  src: [
    { path: "./.font-cache/clash-display-500.woff2", weight: "500" },
    { path: "./.font-cache/clash-display-600.woff2", weight: "600" },
    { path: "./.font-cache/clash-display-700.woff2", weight: "700" },
  ],
  variable: "--display-font",
  display: "optional",
  preload: false,
});

export const mainFont = localFont({
  src: [
    { path: "./.font-cache/satoshi-400.woff2", weight: "400" },
    { path: "./.font-cache/satoshi-500.woff2", weight: "500" },
    { path: "./.font-cache/satoshi-700.woff2", weight: "700" },
  ],
  variable: "--main-font",
  display: "optional",
  preload: false,
});

// Small utility labels do not need two more font files on the critical path.
// Keep the export shape and the existing Tailwind font-mono utilities.
export const monoFont = { variable: "[--mono-font:ui-monospace]" };
