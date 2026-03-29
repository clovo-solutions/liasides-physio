"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Locale, Translations } from "./types";

import en from "@/locales/en.json";
import gr from "@/locales/gr.json";
import ru from "@/locales/ru.json";

/* ── Locale registry ─────────────────────────────────────
   To add a new language:
   1. Create /locales/xx.json
   2. Import it above
   3. Add it to LOCALES and TRANSLATIONS below              */

export const LOCALES: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  gr: { label: "Ελληνικά", flag: "🇬🇷" },
  ru: { label: "Русский", flag: "🇷🇺" },
};

const TRANSLATIONS: Record<Locale, Translations> = {
  en: en as Translations,
  gr: gr as Translations,
  ru: ru as Translations,
};

const DEFAULT_LOCALE: Locale = "en";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: TRANSLATIONS[DEFAULT_LOCALE],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang = newLocale === "gr" ? "el" : newLocale;
      localStorage.setItem("preferred-locale", newLocale);
    }
  }, []);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t: TRANSLATIONS[locale],
  };

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
