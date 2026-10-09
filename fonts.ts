import { JetBrains_Mono } from "next/font/google";

/**
 * Display (Clash Display) and body (Satoshi) come from Fontshare — they are
 * not on Google Fonts. The stylesheet is linked in app/layout.tsx and the
 * `.font-vars` class in globals.css maps them onto the same CSS variables the
 * rest of the code already reads (--display-font, --main-font), so nothing
 * downstream changes. The objects keep the `.variable` shape of next/font.
 */
export const displayFont = { variable: "font-vars" };

/** Body: everything that is read rather than looked at. */
export const mainFont = { variable: "font-vars" };

/** Utility: eyebrows, figures, dates, technology names. */
export const monoFont = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--mono-font",
});
