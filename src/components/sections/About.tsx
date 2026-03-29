"use client";

import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";
import type { AboutData } from "@/lib/types";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const { t } = useI18n();
  const { ref: cardRef, isInView: cardInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <SectionWrapper id="about" label={t.about.sectionLabel}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-6 text-balance">
            {t.about.headline}
          </h2>
          <p className="text-ink-secondary text-lg leading-relaxed mb-8">
            {t.about.description}
          </p>

          <div
            ref={cardRef}
            className={clsx(
              "flex items-start gap-4 p-4 bg-white rounded-2xl border border-brand-100 shadow-sm anim-fade-up",
              cardInView && "in-view"
            )}
          >
            <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-display text-xl font-semibold shrink-0">
              {data.therapist.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-brand-900">
                {data.therapist.name}
              </p>
              <p className="text-sm text-ink-secondary truncate">
                {t.about.therapistTitle}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className={clsx("grid gap-4 stagger", gridInView && "in-view")}
        >
          {data.features.map((feature, i) => (
            <div
              key={i}
              className={clsx(
                "group p-6 bg-white rounded-2xl border border-brand-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 anim-fade-up",
                gridInView && "in-view"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors shrink-0">
                  <Icon name={feature.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900 mb-1">
                    {t.about[`feature-${feature.icon}-title`] || feature.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {t.about[`feature-${feature.icon}-desc`] ||
                      feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
