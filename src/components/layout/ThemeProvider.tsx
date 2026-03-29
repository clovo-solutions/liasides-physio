"use client";

import { useEffect } from "react";
import { generateCSSVariables } from "@/lib/colors";
import type { ThemeConfig } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   Theme Provider

   Reads theme config from site.json (passed as props) and
   injects CSS custom properties onto <html>.

   This runs once on mount. The generated variables are:
     --brand-50 through --brand-950  (from primaryColor)
     --accent-50 through --accent-950 (from accentColor)

   Tailwind picks these up via tailwind.config.ts.
   ───────────────────────────────────────────────────────── */

interface ThemeProviderProps {
  theme: ThemeConfig;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    /* ── Generate and apply brand palette ─────────────── */
    const brandVars = generateCSSVariables(theme.primaryColor, "brand");
    for (const [prop, value] of Object.entries(brandVars)) {
      root.style.setProperty(prop, value);
    }

    /* ── Generate and apply accent palette ────────────── */
    if (theme.accentColor) {
      const accentVars = generateCSSVariables(theme.accentColor, "accent");
      for (const [prop, value] of Object.entries(accentVars)) {
        root.style.setProperty(prop, value);
      }
    }

    /* ── Apply surface & ink colors ──────────────────── */
    if (theme.surfaceColor) {
      root.style.setProperty("--surface", hexToRGBInline(theme.surfaceColor));
    }
    if (theme.inkColor) {
      root.style.setProperty("--ink", hexToRGBInline(theme.inkColor));
    }
  }, [theme]);

  return <>{children}</>;
}

/** Quick inline hex→RGB for one-off surface/ink colors */
function hexToRGBInline(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}
