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
          // Phones get a tighter gutter: at 390px every pixel spent here comes
          // straight out of the card the visitor came to read.
          DEFAULT: "0.75rem",
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
        /**
         * Text roles. The pages previously reached for whichever gray felt
         * right (gray-200/300/400, white/80), which is why they drifted apart.
         */
        ink: {
          strong: "#e8ecf4", // headings
          body: "#c3cede", // paragraphs
          muted: "#93a3bd", // labels, captions, meta
        },
        surface: {
          base: "#0a1326", // page background
          panel: "#0f172a", // glass panels, hero, timeline cards
          card: "#0D1127", // card gradient — from
          "card-to": "#1a1f3c", // card gradient — to
          // Sits *behind* the pinboard so a lifted card has something darker
          // to cast onto. Without it, a shadow on #0a1326 reads as grey haze.
          well: "#060b18",
        },

        /**
         * Two accents, not one. Cyan is the interface accent — links, focus,
         * active state. Brass is reserved for the pinboard: the pin heads and
         * the sheen that rakes across a card under the pointer. Keeping the
         * warm colour out of the UI chrome is what stops it reading as a
         * second theme colour and lets it mark the signature element alone.
         */
        brass: {
          DEFAULT: "#E9B872",
          dim: "#B98F52",
        },
      },

      // add new shadows
      boxShadow: {
        "custom-shadow": "0px 0px 4px #e9ecef, 0px 0px 4px #e9ecef",
        // A pinned card at rest, and the same card lifted toward the pointer.
        // Two stacked shadows each: a tight contact shadow plus a wide soft
        // one, which is what separates "floating" from "stuck on".
        pinned:
          "0 1px 2px rgba(0,0,0,0.45), 0 10px 24px -12px rgba(0,0,0,0.65)",
        lifted: "0 2px 6px rgba(0,0,0,0.5), 0 32px 60px -24px rgba(3,7,18,0.9)",
      },

      keyframes: {
        // The brass pin catching light as the card settles.
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
