import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";

/**
 * Display: the name on the home page, page headings, card titles.
 *
 * Variable on opsz, so a 5rem name and a 1rem card title can each get their own
 * optical size instead of one being the other scaled. The .display-* classes in
 * globals.css drive the axes.
 */
export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
  variable: "--display-font",
});

/** Body: everything that is read rather than looked at. */
export const mainFont = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--main-font",
});

/** Utility: eyebrows, figures, dates, technology names. */
export const monoFont = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--mono-font",
});
