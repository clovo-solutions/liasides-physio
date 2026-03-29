"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, scaleIn, viewportConfig } from "@/lib/animations";
import type { BookingData } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   Booking Section

   Supports two modes driven by site.json:
   • "embed"  — renders Calendly inline via iframe
   • "popup"  — renders a CTA button that opens the
                 Calendly popup widget (loads script on demand)

   If booking.enabled === false the component returns null
   and takes up zero DOM space.

   CMS migration:
   const booking = await client.fetch(
     `*[_type == "siteSettings"][0].booking`
   )
   ───────────────────────────────────────────────────────── */

interface BookingSectionProps {
  data: BookingData;
}

export function BookingSection({ data }: BookingSectionProps) {
  const { t } = useI18n();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  /* ── Conditionally skip render ──────────────────────── */
  if (!data.enabled) {
    return null;
  }

  /* ── Load Calendly widget script on demand (popup mode) */
  useEffect(() => {
    if (data.mode !== "popup") {
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.head.appendChild(script);

    /* Also inject Calendly's base CSS for the popup overlay */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    return () => {
      /* Cleanup is intentionally omitted — the script is
         cached and harmless to keep around once loaded.    */
    };
  }, [data.mode]);

  /* ── Open Calendly popup ────────────────────────────── */
  const openPopup = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).Calendly &&
      scriptLoaded
    ) {
      (window as any).Calendly.initPopupWidget({ url: data.url });
      setPopupOpen(true);
    }
  }, [data.url, scriptLoaded]);

  return (
    <SectionWrapper
      id="booking"
      label={t.booking.sectionLabel}
      background="muted"
    >
      <div className="text-center mb-10">
        <motion.h2
          className="font-display text-display-lg font-semibold text-brand-900 mb-4 text-balance"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {data.headline}
        </motion.h2>
        <motion.p
          className="text-ink-secondary text-lg max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {data.subheadline}
        </motion.p>
      </div>

      {/* ── Embed Mode ────────────────────────────────────── */}
      {data.mode === "embed" && (
        <motion.div
          className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-brand-100 bg-white shadow-sm"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <iframe
            src={data.url}
            width="100%"
            height="660"
            frameBorder="0"
            title={t.booking.iframeTitle}
            className="w-full min-h-[580px] sm:min-h-[660px]"
            loading="lazy"
          />
        </motion.div>
      )}

      {/* ── Popup Mode ────────────────────────────────────── */}
      {data.mode === "popup" && (
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Decorative calendar icon */}
          <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
            <Icon name="clock" className="w-9 h-9 text-brand-600" />
          </div>

          <p className="text-ink-secondary text-center max-w-md">
            {t.booking.popupDescription}
          </p>

          <Button size="lg" onClick={openPopup} className="min-w-[220px]">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            {t.booking.ctaButton}
          </Button>

          {/* Subtle trust line */}
          {/* <p className="text-xs text-ink-muted">{t.booking.trustLine}</p> */}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
