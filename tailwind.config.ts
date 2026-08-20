import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      main: ["var(--main-font)", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "4rem",
          xl: "5rem",
        },
      },

      colors: {
        primary: {
          dark: "#182131",
          light: "#0a1326",
        },
        secondary: {
          dark: "#496edd", // Updated dark color
          light: "#3B82F6", // Updated light color
        },
        text: {
          primary: "#ffffff",
          secondary: "#e9ecef",
        },
        /**
         * The four navy shades the UI actually uses. They were previously
         * written as raw hex in ~24 places, which read as inconsistency rather
         * than intent — #0a1326, #0f172a and #0D1127 are close enough to look
         * like the same colour done three different ways.
         */
        surface: {
          base: "#0a1326", // page background
          panel: "#0f172a", // glass panels, hero, timeline cards
          card: "#0D1127", // card gradient — from
          "card-to": "#1a1f3c", // card gradient — to
        },
      },

      // add new shadows
      boxShadow: {
        "custom-shadow": "0px 0px 4px #e9ecef, 0px 0px 4px #e9ecef",
      },
    },
  },
  // Enables the `prose` classes already used by the chatbot's markdown output.
  plugins: [typography],
} satisfies Config;
