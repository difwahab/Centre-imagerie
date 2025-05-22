import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}"
  ],

  darkMode: "class", // Active le mode sombre avec la classe "dark"

  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        popoverForeground: "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        secondaryForeground: "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: "hsl(var(--destructive))",
        destructiveForeground: "hsl(var(--destructive-foreground))",
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".custom-shadow": {
          "box-shadow": "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }
      });
    }),
  ],
};

export default config;