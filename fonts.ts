import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";

/**
 * Display voice: the name on the home page, page headings, project titles.
 *
 * Bricolage Grotesque is a variable grotesque with an optical-size axis, so
 * the same family can set a 5rem name with tight, confident spacing and a
 * 1rem card title without either looking like the other scaled up or down.
 * Its slightly irregular terminals give the headings a drawn quality that a
 * neutral geometric sans does not have — used only where a heading is, never
 * for running text.
 */
export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  // Variable across all three axes: opsz is driven per-role in the CSS,
  // wdth lets the largest headings narrow slightly instead of wrapping.
  axes: ["opsz", "wdth"],
  variable: "--display-font",
});

/**
 * Body voice: paragraphs, labels, buttons — everything that is read rather
 * than looked at. Instrument Sans is a touch narrower than the usual UI
 * grotesques, which keeps a 58ch measure compact without feeling cramped.
 */
export const mainFont = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--main-font",
});

/**
 * Utility voice: eyebrows, the role line, figures, and metadata.
 * A monospace face is the vernacular of the work this portfolio is about, and
 * it carries the personality that a sans alone does not.
 */
export const monoFont = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--mono-font",
});
