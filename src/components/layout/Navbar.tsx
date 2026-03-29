"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, LOCALES } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import type { BusinessInfo, Locale } from "@/lib/types";

interface NavbarProps {
  business: BusinessInfo;
}

export function Navbar({ business }: NavbarProps) {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#location", label: t.nav.location },
    { href: "#contact", label: t.nav.contact },
  ];

  /* ── Color scheme flips based on scroll position ─────
     Not scrolled = over hero image → white text
     Scrolled = white background → dark text              */
  const logoColor = scrolled ? "text-brand-800" : "text-white";
  const linkColor = scrolled
    ? "text-ink-secondary hover:text-brand-700"
    : "text-white/80 hover:text-white";
  const iconColor = scrolled
    ? "text-ink-secondary hover:text-brand-700"
    : "text-white/80 hover:text-white";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-brand-100"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow mx-auto px-5 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ── Logo / Brand ───────────────────────────────── */}
          <a
            href="#"
            className={`font-display text-xl lg:text-2xl font-semibold tracking-tight transition-colors duration-300 ${logoColor}`}
          >
            {business.name}
          </a>

          {/* ── Desktop Nav ────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${linkColor}`}
              >
                {link.label}
              </a>
            ))}

            {/* ── Language Switcher ─────────────────────────── */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangOpen(!langOpen);
                }}
                className={`flex items-center gap-1.5 text-sm transition-colors duration-300 px-2 py-1 rounded-lg ${iconColor} ${
                  scrolled ? "hover:bg-brand-50" : "hover:bg-white/10"
                }`}
              >
                <span>{LOCALES[locale].flag}</span>
                <Icon name="chevron-down" className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-brand-100 overflow-hidden min-w-[140px]"
                  >
                    {(
                      Object.entries(LOCALES) as [
                        Locale,
                        { label: string; flag: string }
                      ][]
                    ).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setLocale(key);
                          setLangOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors ${
                          locale === key
                            ? "bg-brand-50 text-brand-800 font-medium"
                            : "text-ink-secondary hover:bg-brand-50"
                        }`}
                      >
                        <span>{val.flag}</span>
                        <span>{val.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Mobile Menu Toggle ──────────────────────────── */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={`lg:hidden p-2 transition-colors duration-300 ${iconColor}`}
            aria-label="Toggle menu"
          >
            <Icon name={isOpen ? "x" : "menu"} className="w-6 h-6" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-brand-100 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="block px-4 py-3 text-base font-medium text-ink-secondary hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile language switcher */}
              <div className="pt-4 border-t border-brand-100 mt-4 flex gap-2">
                {(
                  Object.entries(LOCALES) as [
                    Locale,
                    { label: string; flag: string }
                  ][]
                ).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setLocale(key);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                      locale === key
                        ? "bg-brand-100 text-brand-800 font-medium"
                        : "text-ink-secondary hover:bg-brand-50"
                    }`}
                  >
                    <span>{val.flag}</span>
                    <span>{val.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
