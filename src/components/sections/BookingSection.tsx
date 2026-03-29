"use client";

import { useEffect, useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";
import type { BookingData } from "@/lib/types";

interface BookingSectionProps {
  data: BookingData;
}

export function BookingSection({ data }: BookingSectionProps) {
  const { t } = useI18n();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { ref, isInView } = useInView();

  if (!data.enabled) {
    return null;
  }

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

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, [data.mode]);

  const openPopup = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).Calendly &&
      scriptLoaded
    ) {
      (window as any).Calendly.initPopupWidget({ url: data.url });
    }
  }, [data.url, scriptLoaded]);

  return (
    <SectionWrapper
      id="booking"
      label={t.booking.sectionLabel}
      background="muted"
    >
      <div ref={ref} className="text-center mb-10">
        <h2
          className={clsx(
            "font-display text-display-lg font-semibold text-brand-900 mb-4 text-balance anim-fade-up",
            isInView && "in-view"
          )}
        >
          {t.booking.headline}
        </h2>
        <p
          className={clsx(
            "text-ink-secondary text-lg max-w-2xl mx-auto anim-fade-up",
            isInView && "in-view"
          )}
          style={{ transitionDelay: "0.1s" }}
        >
          {t.booking.subheadline}
        </p>
      </div>

      {data.mode === "embed" && (
        <div
          className={clsx(
            "relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-brand-100 bg-white shadow-sm anim-scale-in",
            isInView && "in-view"
          )}
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
        </div>
      )}

      {data.mode === "popup" && (
        <div
          className={clsx(
            "flex flex-col items-center gap-6 anim-fade-up",
            isInView && "in-view"
          )}
          style={{ transitionDelay: "0.2s" }}
        >
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
        </div>
      )}
    </SectionWrapper>
  );
}
