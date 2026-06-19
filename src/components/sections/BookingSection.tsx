"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";
import type { BookingData } from "@/lib/types";

interface BookingSectionProps {
  data: BookingData;
}

export function BookingSection({ data }: BookingSectionProps) {
  const { t } = useI18n();
  const { ref, isInView } = useInView();

  /* ── Cal.com embed bootstrap ─────────────────────────────
     Loads the official Cal embed once. Any element with a
     data-cal-link attribute then opens the booking modal on
     click — no extra wiring needed.                          */
  useEffect(() => {
    const w = window as unknown as {
      Cal?: ((...args: unknown[]) => void) & {
        loaded?: boolean;
        ns?: Record<string, unknown>;
        q?: unknown[];
      };
      document: Document;
    };

    (function (C, A, L) {
      const p = function (a: { q: unknown[] }, ar: unknown) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...ar: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function (...a: unknown[]) {
              p(api as unknown as { q: unknown[] }, a);
            };
            (api as unknown as { q: unknown[] }).q = [];
            p(cal as unknown as { q: unknown[] }, ar);
            return;
          }
          p(cal as unknown as { q: unknown[] }, ar);
        };
    })(w, "https://app.cal.com/embed/embed.js", "init");

    w.Cal!("init", { origin: "https://cal.com" });
    w.Cal!("ui", {
      theme: "light",
      cssVarsPerTheme: {
        light: { "cal-brand": "#4B5A3D" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  if (!data.enabled || data.type !== "cal.com") {
    return null;
  }

  return (
    <SectionWrapper id="booking" background="muted">
      <div ref={ref} className="mb-10">
        <SectionHeading
          eyebrow={t.booking.sectionLabel}
          title={t.booking.headline}
          subtitle={t.booking.subheadline}
        />
      </div>

      <div
        className={clsx(
          "flex flex-col items-center gap-6 anim-fade-up",
          isInView && "in-view"
        )}
        style={{ transitionDelay: "0.2s" }}
      >
        <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
          <Icon name="calendar" className="w-9 h-9 text-brand-600" />
        </div>

        <p className="text-ink-secondary text-center max-w-md">
          {t.booking.popupDescription}
        </p>

        <button
          type="button"
          data-cal-link={data.calLink}
          data-cal-config='{"layout":"month_view"}'
          className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 bg-brand-700 text-white hover:bg-brand-800 hover:scale-[1.02] active:scale-[0.98] px-8 py-4 text-base shadow-glow min-w-[220px]"
        >
          <Icon name="calendar" className="w-5 h-5" />
          {t.booking.ctaButton}
        </button>
      </div>
    </SectionWrapper>
  );
}
