import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        // Inter para todo — display sigue siendo Inter tight
        display: ["var(--font-sans)", "Inter", "sans-serif"],
        sans:    ["var(--font-sans)", "Inter", "sans-serif"],
        mono:    ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        border:     "hsl(var(--border) / <alpha-value>)",
        input:      "hsl(var(--input)  / <alpha-value>)",
        ring:       "hsl(var(--ring)   / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT:    "hsl(var(--primary)            / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary)            / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive)            / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted)            / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent)            / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT:    "hsl(var(--card)            / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        positive: "hsl(var(--positive) / <alpha-value>)",
        neutral:  "hsl(var(--neutral)  / <alpha-value>)",
        negative: "hsl(var(--negative) / <alpha-value>)",
      },
      borderRadius: {
        lg:  "var(--radius)",                       // 8px
        md:  "calc(var(--radius) - 2px)",           // 6px
        sm:  "calc(var(--radius) - 4px)",           // 4px
        xl:  "calc(var(--radius) + 4px)",           // 12px
        "2xl": "calc(var(--radius) + 8px)",         // 16px
        "3xl": "calc(var(--radius) + 16px)",        // 24px
      },
      boxShadow: {
        // Material You — difuso, sin dureza
        "card-sm":  "0 1px 3px 0 rgba(15,23,42,0.08), 0 1px 2px -1px rgba(15,23,42,0.04)",
        "card-md":  "0 4px 6px -1px rgba(15,23,42,0.08), 0 2px 4px -2px rgba(15,23,42,0.04)",
        "card-lg":  "0 10px 15px -3px rgba(15,23,42,0.08), 0 4px 6px -4px rgba(15,23,42,0.04)",
        "primary":  "0 4px 14px 0 hsl(248 79% 39% / 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
