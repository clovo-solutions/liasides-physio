import type { Config } from "tailwindcss";

/* ─────────────────────────────────────────────────────────
   Tailwind Config — CSS Variable-Driven Color System

   All brand colors reference CSS custom properties that are
   injected at runtime by ThemeProvider from site.json.

   The rgb() wrapper allows Tailwind's opacity modifiers
   to work: bg-brand-500/50, text-brand-700/80, etc.

   Fallback values match the default sage green palette
   so the site still renders if JS hasn't loaded yet.
   ───────────────────────────────────────────────────────── */

function cssVar(variable: string, fallback: string) {
  return `rgb(var(${variable}, ${fallback}) / <alpha-value>)`;
}

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: cssVar("--brand-50", "246 247 244"),
          100: cssVar("--brand-100", "232 235 227"),
          200: cssVar("--brand-200", "212 218 200"),
          300: cssVar("--brand-300", "181 192 163"),
          400: cssVar("--brand-400", "150 166 126"),
          500: cssVar("--brand-500", "122 142 99"),
          600: cssVar("--brand-600", "95 114 76"),
          700: cssVar("--brand-700", "75 90 61"),
          800: cssVar("--brand-800", "62 74 52"),
          900: cssVar("--brand-900", "53 63 46"),
          950: cssVar("--brand-950", "26 33 22"),
        },
        accent: {
          50: cssVar("--accent-50", "254 252 243"),
          100: cssVar("--accent-100", "252 247 218"),
          200: cssVar("--accent-200", "248 238 181"),
          300: cssVar("--accent-300", "243 224 138"),
          400: cssVar("--accent-400", "233 196 106"),
          500: cssVar("--accent-500", "210 168 75"),
          600: cssVar("--accent-600", "180 136 51"),
          700: cssVar("--accent-700", "143 104 41"),
          800: cssVar("--accent-800", "117 85 38"),
          900: cssVar("--accent-900", "97 71 34"),
          950: cssVar("--accent-950", "56 39 18"),
        },
        surface: {
          DEFAULT: `rgb(var(--surface, 250 249 247) / <alpha-value>)`,
          warm: `rgb(var(--surface-warm, 245 243 239) / <alpha-value>)`,
          muted: `rgb(var(--surface-muted, 237 234 228) / <alpha-value>)`,
        },
        ink: {
          DEFAULT: `rgb(var(--ink, 28 25 23) / <alpha-value>)`,
          secondary: `rgb(var(--ink-secondary, 87 83 78) / <alpha-value>)`,
          muted: `rgb(var(--ink-muted, 168 162 158) / <alpha-value>)`,
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3rem, 6vw, 5.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-xl": [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
      },
      spacing: {
        section: "clamp(4rem, 10vw, 8rem)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px -1px rgb(28 25 23 / 0.06), 0 4px 16px -4px rgb(28 25 23 / 0.08)",
        "card-hover":
          "0 2px 4px -2px rgb(28 25 23 / 0.08), 0 18px 40px -12px rgb(28 25 23 / 0.16)",
        glow: "0 10px 40px -12px rgb(var(--brand-700, 75 90 61) / 0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
