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
          strong: "oklch(from var(--portfolio-strong) l c h / <alpha-value>)", // headings          14.6:1 on surface.base
          body: "oklch(from var(--portfolio-body) l c h / <alpha-value>)", //   paragraphs         9.7:1
          muted: "oklch(from var(--portfolio-muted) l c h / <alpha-value>)", //  labels, captions   5.4:1
        },

        surface: {
          well: "oklch(from var(--portfolio-well) l c h / <alpha-value>)", //   behind a lifted card, so its shadow lands on something
          base: "oklch(from var(--portfolio-base) l c h / <alpha-value>)", //   page
          panel: "oklch(from var(--portfolio-panel) l c h / <alpha-value>)", //  cards, timeline entries
          raised: "oklch(from var(--portfolio-raised) l c h / <alpha-value>)", // hover / raised
          card: "oklch(from var(--portfolio-panel) l c h / <alpha-value>)",
          "card-to": "oklch(from var(--portfolio-raised) l c h / <alpha-value>)",
        },

        // Hairlines. A white border over a warm ground reads grey and cold.
        parchment: "oklch(from var(--portfolio-strong) l c h / <alpha-value>)",

        /** Rails, eyebrows, figures, timeline nodes, links, buttons, focus. */
        sage: {
          DEFAULT: "oklch(from var(--portfolio-accent) l c h / <alpha-value>)", // text and fills      9.0:1 on surface.base
          bright: "oklch(from var(--portfolio-accent-bright) l c h / <alpha-value>)", //  hover on a filled button
          dim: "oklch(from var(--portfolio-accent-dim) l c h / <alpha-value>)", //     quieter marks
          deep: "oklch(from var(--portfolio-accent-deep) l c h / <alpha-value>)", //    gradient ends
          deepest: "oklch(from var(--portfolio-accent-darkest) l c h / <alpha-value>)", // text on a sage fill: links in a sent message  5.4:1
        },

        /** The pinboard alone: pin heads and the sheen. Nothing else. */
        wheat: {
          DEFAULT: "oklch(from var(--portfolio-support) l c h / <alpha-value>)",
          deep: "oklch(from var(--portfolio-support-deep) l c h / <alpha-value>)",
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
        accent: "var(--portfolio-shadow-accent)",
        "custom-shadow": "0px 0px 4px #e9ecef, 0px 0px 4px #e9ecef",
        // Tight contact shadow plus a wide soft one: what separates
        // "floating" from "stuck on".
        pinned:
          "var(--portfolio-shadow-pinned)",
        lifted:
          "var(--portfolio-shadow-lifted)",
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
