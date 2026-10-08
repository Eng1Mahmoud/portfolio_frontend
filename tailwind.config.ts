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
      // Three roles, three faces. `display` is for headings only — it has an
      // optical-size axis that the .display-* utilities in globals.css drive.
      display: ["var(--display-font)", "var(--main-font)", "sans-serif"],
      main: ["var(--main-font)", "system-ui", "sans-serif"],
      mono: ["var(--mono-font)", "ui-monospace", "monospace"],
    },
    extend: {
      container: {
        center: true,
        padding: {
          // At 390px every pixel here comes out of the card itself.
          DEFAULT: "0.75rem",
          sm: "1rem",
          lg: "4rem",
          xl: "5rem",
        },
      },

      colors: {
        /*
          Night & electric: periwinkle-blue accent on deep indigo night (token names kept so every component recolours). The accent is deliberately
          low-chroma — a saturated accent on a dark ground glares, and this is
          a page people read for minutes.

          Ratios below were computed against WCAG AA, not eyeballed.
        */
        ink: {
          strong: "#EEF0FF", // headings          14.6:1 on surface.base
          body: "#B8BEDA", //   paragraphs         9.7:1
          muted: "#8389AB", //  labels, captions   5.4:1
        },

        surface: {
          well: "#05060D", //   behind a lifted card, so its shadow lands on something
          base: "#0A0C17", //   page
          panel: "#12152A", //  cards, timeline entries
          raised: "#1B1F3A", // hover / raised
          card: "#12152A",
          "card-to": "#1B1F3A",
        },

        // Hairlines. A white border over a warm ground reads grey and cold.
        parchment: "#E6E9FF",

        /** Rails, eyebrows, figures, timeline nodes, links, buttons, focus. */
        sage: {
          DEFAULT: "#7C9CFF", // text and fills      9.0:1 on surface.base
          bright: "#A5B8FF", //  hover on a filled button
          dim: "#5B6FD6", //     quieter marks
          deep: "#4338CA", //    gradient ends
          deepest: "#1E1B4B", // text on a sage fill: links in a sent message  5.4:1
        },

        /** The pinboard alone: pin heads and the sheen. Nothing else. */
        wheat: {
          DEFAULT: "#C4A5FF",
          deep: "#7C5CE0",
        },

        /** Dashboard and auth screens only. */
        primary: {
          dark: "#182131",
          light: "#171A16",
        },
        secondary: {
          dark: "#496edd",
          light: "#3B82F6",
        },
        text: {
          primary: "#ffffff",
          secondary: "#e9ecef",
        },
      },

      boxShadow: {
        "custom-shadow": "0px 0px 4px #e9ecef, 0px 0px 4px #e9ecef",
        // Tight contact shadow plus a wide soft one: what separates
        // "floating" from "stuck on".
        pinned:
          "0 1px 2px rgba(0,0,0,0.45), 0 10px 24px -12px rgba(0,0,0,0.65)",
        lifted:
          "0 2px 6px rgba(0,0,0,0.55), 0 32px 60px -24px rgba(10,8,6,0.95)",
      },

      keyframes: {
        "pin-glint": {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pin-glint": "pin-glint 4s ease-in-out infinite",
      },
    },
  },
  // Enables the `prose` classes already used by the chatbot's markdown output.
  plugins: [typography],
} satisfies Config;
