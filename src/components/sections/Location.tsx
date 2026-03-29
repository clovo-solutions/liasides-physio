"use client";

import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";
import type { LocationData } from "@/lib/types";

interface LocationProps {
  data: LocationData;
}

const dayKeyMap: Record<string, string> = {
  "Monday – Friday": "mon-fri",
  Saturday: "saturday",
  Sunday: "sunday",
};

export function Location({ data }: LocationProps) {
  const { t } = useI18n();
  const { ref: mapRef, isInView: mapInView } = useInView();
  const { ref: infoRef, isInView: infoInView } = useInView();

  const mapsUrl = `https://www.google.com/maps/place/Liasides+Physio/@34.7092705,33.0533016,15z/data=!4m16!1m9!4m8!1m0!1m6!1m2!1s0x14e733c78f0e1955:0xebdd4bbbf2134548!2sLiasides+Physio,+P35C%2BPW5,+Agios+Athanasios+4107,+Cyprus!2m2!1d33.072356!2d34.7092705!3m5!1s0x14e733c78f0e1955:0xebdd4bbbf2134548!8m2!3d34.7092705!4d33.072356!16s%2Fg%2F11jcg06_pd?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D`;

  return (
    <SectionWrapper
      id="location"
      label={t.location.sectionLabel}
      background="warm"
    >
      <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-10 text-balance">
        {t.location.headline}
      </h2>

      <div className="grid lg:grid-cols-5 gap-8 lg:items-stretch">
        <div
          ref={mapRef}
          className={clsx(
            "lg:col-span-3 relative rounded-2xl overflow-hidden border border-brand-100 bg-brand-50 h-full anim-fade-up",
            mapInView && "in-view"
          )}
        >
          <iframe
            src={`https://maps.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}&z=${data.mapZoom}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Business Location"
            className="w-full h-full min-h-[400px]"
          />
        </div>

        <div
          ref={infoRef}
          className={clsx(
            "lg:col-span-2 flex flex-col gap-6 h-full stagger",
            infoInView && "in-view"
          )}
        >
          <div
            className={clsx(
              "bg-white rounded-2xl border border-brand-100 p-6 flex-1 anim-fade-up",
              infoInView && "in-view"
            )}
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
                <p className="text-sm text-ink-secondary">
                  {data.address.country}
                </p>
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
          </div>

          <div
            className={clsx(
              "bg-white rounded-2xl border border-brand-100 p-6 flex-1 anim-fade-up",
              infoInView && "in-view"
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon name="clock" className="w-5 h-5 text-brand-600" />
              <h3 className="font-semibold text-brand-900">
                {t.location.openingHours}
              </h3>
            </div>
            <div className="space-y-2.5">
              {data.hours.map((slot, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-ink-secondary">
                    {t.location[dayKeyMap[slot.days]] || slot.days}
                  </span>
                  <span
                    className={`font-medium ${
                      slot.time === "Closed" ? "text-red-500" : "text-brand-800"
                    }`}
                  >
                    {slot.time === "Closed" ? t.location.closed : slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
