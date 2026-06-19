"use client";

import { clsx } from "clsx";
import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { Icon } from "@/components/ui/Icon";
import type { StatItem } from "@/lib/types";

interface StatsProps {
  stats: StatItem[];
  rating?: number;
  reviewCount?: number;
}

export function Stats({ stats, rating, reviewCount }: StatsProps) {
  const { t } = useI18n();
  const { ref, isInView } = useInView();

  // Combine editable static stats (site.json) with live Google values.
  const items: StatItem[] = [
    ...stats,
    ...(rating
      ? [{ value: rating.toFixed(1), label: t.stats.googleRating, icon: "star" }]
      : []),
    ...(reviewCount
      ? [
          {
            value: String(reviewCount),
            label: t.stats.verifiedReviews,
            icon: "heart",
          },
        ]
      : []),
  ];

  return (
    <section className="bg-surface px-5 sm:px-8 lg:px-16 pt-12 sm:pt-16 relative z-10">
      <div
        ref={ref}
        className={clsx(
          "container-narrow rounded-3xl border border-brand-100 bg-white shadow-card anim-fade-up",
          isInView && "in-view"
        )}
      >
        <dl
          className={clsx(
            "grid grid-cols-2 md:grid-cols-4 divide-y divide-brand-100 md:divide-y-0 md:divide-x stagger",
            isInView && "in-view"
          )}
        >
          {items.map((stat, i) => (
            <div
              key={i}
              className={clsx(
                "flex flex-col items-center text-center gap-2 px-6 py-8 anim-fade-up",
                isInView && "in-view"
              )}
            >
              <span className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600">
                <Icon name={stat.icon} className="w-5 h-5" />
              </span>
              <dd className="font-display text-3xl sm:text-4xl font-semibold text-gradient-accent leading-none">
                {stat.value}
              </dd>
              <dt className="text-sm text-ink-secondary">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
