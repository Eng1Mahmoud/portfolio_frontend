import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
      },

      // add new shadows
      boxShadow: {
        "custom-shadow": "0px 0px 4px #e9ecef, 0px 0px 4px #e9ecef",
      },
    },
  },
  plugins: [],
} satisfies Config;
