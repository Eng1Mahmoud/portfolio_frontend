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
        /*
          Eucalyptus: soft sage on warm charcoal.

          What this replaced was navy with a cyan accent, and the real problem
          was not the hues — every token in it, the body copy and the muted
          labels included, carried the same blue cast, so the page read as one
          note held down. Here the ground is a warm charcoal with a brown
          undertone and the text is a warm off-white, so nothing is tinted the
          same way as the thing behind it.

          The accent is deliberately low-chroma. A saturated accent on a dark
          ground glares, and this is a page someone reads for several minutes.
          Sage stays legible at 9:1 without ever being the brightest thing on
          screen.

          Every foreground/background pair below was computed against WCAG AA
          (4.5:1 for text, 3:1 for UI edges), not eyeballed.
        */

        // Text. Names unchanged from the previous palette so every
        // `text-ink-body` in the app keeps working — only the values moved.
        ink: {
          strong: "#E8EBE5", // headings          14.6:1 on surface.base
          body: "#BCC2B7", //   paragraphs         9.7:1
          muted: "#8A9085", //  labels, captions   5.4:1
        },

        surface: {
          well: "#101210", //   behind a lifted card, so its shadow lands on something
          base: "#171A16", //   page
          panel: "#1F231E", //  cards, timeline entries
          raised: "#292E27", // hover / raised
          card: "#1F231E",
          "card-to": "#292E27",
        },

        // Hairlines and glass fills. A white border over a warm ground reads
        // grey and cold; this is the page's own off-white, so an edge stays
        // in family with everything around it.
        parchment: "#E8EBE5",

        /**
         * One accent, used for everything the visitor reads as a mark or acts
         * on: rails, eyebrows, figures, timeline nodes, links, buttons, focus.
         * Keeping it to a single family is most of why the page stays calm.
         */
        sage: {
          DEFAULT: "#9DC2A6", // text and fills      9.0:1 on surface.base
          bright: "#B4D3BC", //  hover on a filled button
          dim: "#6E8C76", //     quieter marks
          deep: "#4C6B54", //    gradient ends
          deepest: "#2E4435", // text on a sage fill: links in a sent message  5.4:1
        },

        /**
         * The pinboard alone — the pin heads and the sheen that rakes across a
         * card. Both are decorative and aria-hidden, so this warm straw exists
         * only to keep the one signature element from dissolving into the
         * sage. Nothing else may use it.
         */
        wheat: {
          DEFAULT: "#C9B98A",
          deep: "#8E805A",
        },

        /**
         * Referenced by the dashboard and auth screens. Nothing in the public
         * site should reach for these.
         */
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

      // add new shadows
      boxShadow: {
        "custom-shadow": "0px 0px 4px #e9ecef, 0px 0px 4px #e9ecef",
        // A pinned card at rest, and the same card lifted toward the pointer.
        // Two stacked shadows each: a tight contact shadow plus a wide soft
        // one, which is what separates "floating" from "stuck on".
        pinned:
          "0 1px 2px rgba(0,0,0,0.45), 0 10px 24px -12px rgba(0,0,0,0.65)",
        lifted:
          "0 2px 6px rgba(0,0,0,0.55), 0 32px 60px -24px rgba(10,8,6,0.95)",
      },

      keyframes: {
        // The pin catching light as the card settles.
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
