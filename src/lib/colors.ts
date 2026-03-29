/* ─────────────────────────────────────────────────────────
   Dynamic Color Scale Generator

   Takes a single hex color and produces a full 50–950
   shade scale by manipulating HSL lightness + saturation.

   This runs once on page load inside ThemeProvider.
   No external dependencies.
   ───────────────────────────────────────────────────────── */

interface HSL {
  h: number;
  s: number;
  l: number;
}

/** Hex string (#RRGGBB or #RGB) → { h, s, l } */
function hexToHSL(hex: string): HSL {
  let r = 0;
  let g = 0;
  let b = 0;

  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16) / 255;
    g = parseInt(clean[1] + clean[1], 16) / 255;
    b = parseInt(clean[2] + clean[2], 16) / 255;
  } else {
    r = parseInt(clean.substring(0, 2), 16) / 255;
    g = parseInt(clean.substring(2, 4), 16) / 255;
    b = parseInt(clean.substring(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** HSL → hex string */
function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Hex → "R G B" string for Tailwind's rgb() usage */
function hexToRGB(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/* ── Shade definitions ─────────────────────────────────────
     Each shade maps to a target lightness value.
     Saturation is slightly reduced at extremes for
     natural-looking palettes.                                */
const SHADE_MAP: Record<string, { lightness: number; saturationMod: number }> =
  {
    "50": { lightness: 97, saturationMod: -30 },
    "100": { lightness: 93, saturationMod: -20 },
    "200": { lightness: 85, saturationMod: -10 },
    "300": { lightness: 74, saturationMod: -5 },
    "400": { lightness: 62, saturationMod: 0 },
    "500": { lightness: 50, saturationMod: 0 },
    "600": { lightness: 41, saturationMod: 0 },
    "700": { lightness: 33, saturationMod: -5 },
    "800": { lightness: 26, saturationMod: -10 },
    "900": { lightness: 20, saturationMod: -15 },
    "950": { lightness: 12, saturationMod: -20 },
  };

export interface ColorScale {
  [shade: string]: string; // shade → hex
}

export interface ColorScaleRGB {
  [shade: string]: string; // shade → "R G B"
}

/**
 * Generate a full 50–950 color scale from a single hex.
 * Returns both hex and RGB formats.
 */
export function generateColorScale(baseHex: string): {
  hex: ColorScale;
  rgb: ColorScaleRGB;
} {
  const base = hexToHSL(baseHex);
  const hex: ColorScale = {};
  const rgb: ColorScaleRGB = {};

  for (const [shade, config] of Object.entries(SHADE_MAP)) {
    const s = Math.max(0, Math.min(100, base.s + config.saturationMod));
    const hexVal = hslToHex(base.h, s, config.lightness);
    hex[shade] = hexVal;
    rgb[shade] = hexToRGB(hexVal);
  }

  return { hex, rgb };
}

/**
 * Generate CSS custom properties for a color scale.
 * Output: { "--brand-50": "246 247 244", "--brand-100": "232 235 227", ... }
 */
export function generateCSSVariables(
  baseHex: string,
  prefix: string = "brand"
): Record<string, string> {
  const { rgb } = generateColorScale(baseHex);
  const vars: Record<string, string> = {};

  for (const [shade, value] of Object.entries(rgb)) {
    vars[`--${prefix}-${shade}`] = value;
  }

  return vars;
}
