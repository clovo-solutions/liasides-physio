"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { LocationData } from "@/lib/types";

interface LocationProps {
  data: LocationData;
}

export function Location({ data }: LocationProps) {
  const { t } = useI18n();

  const fullAddress = `${data.address.street}, ${data.address.city} ${data.address.postalCode}, ${data.address.country}`;
  const mapsUrl = `https://www.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(fullAddress)}&zoom=${data.mapZoom}`;

  return (
    <SectionWrapper id="location" label={t.location.sectionLabel} background="warm">
      <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-10 text-balance">
        {data.headline}
      </h2>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* ── Map Embed ──────────────────────────────────── */}
        <motion.div
          className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-brand-100 bg-brand-50"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* ── Google Maps Embed ───────────────────────────
               Replace YOUR_API_KEY with actual API key,
               or use the iframe approach below.

               For a quick no-API-key approach, use:
               src={`https://maps.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}&z=${data.mapZoom}&output=embed`}
               ─────────────────────────────────────────────── */}
          <iframe
            src={`https://maps.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}&z=${data.mapZoom}&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Business Location"
            className="w-full h-[300px] lg:h-full min-h-[400px]"
          />
        </motion.div>

        {/* ── Info Panel ──────────────────────────────────── */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Address */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl border border-brand-100 p-6"
          >
            <div className="flex items-start gap-3 mb-3">
              <Icon name="map-pin" className="w-5 h-5 text-brand-600 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-900 mb-1">
                  {data.address.street}
                </p>
                <p className="text-sm text-ink-secondary">
                  {data.address.city} {data.address.postalCode}
                </p>
                <p className="text-sm text-ink-secondary">{data.address.country}</p>
              </div>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors mt-2"
            >
              {t.location.getDirections}
              <Icon name="external-link" className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl border border-brand-100 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon name="clock" className="w-5 h-5 text-brand-600" />
              <h3 className="font-semibold text-brand-900">
                {t.location.openingHours}
              </h3>
            </div>
            <div className="space-y-2.5">
              {data.hours.map((slot, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm"
                >
                  <span className="text-ink-secondary">{slot.days}</span>
                  <span
                    className={`font-medium ${
                      slot.time === "Closed" ? "text-red-500" : "text-brand-800"
                    }`}
                  >
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Parking note */}
          {data.parking && (
            <motion.p
              variants={fadeUp}
              className="text-sm text-ink-muted italic px-1"
            >
              {data.parking}
            </motion.p>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
