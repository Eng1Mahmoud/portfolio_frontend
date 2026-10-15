import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

// Prepared from official Fontshare URLs by predev/prebuild. Keep the font
// binaries out of the public repository; see scripts/README.md.
export const displayFont = localFont({
  src: [
    { path: "./.font-cache/clash-display-500.woff2", weight: "500" },
    { path: "./.font-cache/clash-display-600.woff2", weight: "600" },
    { path: "./.font-cache/clash-display-700.woff2", weight: "700" },
  ],
  variable: "--display-font",
  display: "swap",
  preload: true,
});

export const mainFont = localFont({
  src: [
    { path: "./.font-cache/satoshi-400.woff2", weight: "400" },
    { path: "./.font-cache/satoshi-500.woff2", weight: "500" },
    { path: "./.font-cache/satoshi-700.woff2", weight: "700" },
  ],
  variable: "--main-font",
  display: "swap",
  preload: false,
});

export const monoFont = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--mono-font",
  preload: false,
});
