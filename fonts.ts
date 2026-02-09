import { Outfit } from "next/font/google";
// google fonts
export const mainFont = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--main-font",
});
