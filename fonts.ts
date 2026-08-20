import { JetBrains_Mono, Outfit } from "next/font/google";
// google fonts
export const mainFont = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--main-font",
});

/**
 * Utility voice: eyebrows, the role line, and the figures on the home page.
 * A monospace face is the vernacular of the work this portfolio is about, and
 * it carries the personality that a geometric sans alone does not.
 */
export const monoFont = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--mono-font",
});
