"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StarRating } from "@/components/ui/StarRating";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { ReviewsData } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   Reviews Section

   Currently uses mock data from site.json.
   Ready for Google Reviews API integration:

   // Replace mock data with API call:
   // const reviews = await fetchGoogleReviews(placeId);
   // Map API response to ReviewItem[] shape.
   ───────────────────────────────────────────────────────── */

interface ReviewsProps {
  data: ReviewsData;
}

export function Reviews({ data }: ReviewsProps) {
  const { t } = useI18n();

  return (
    <SectionWrapper id="reviews" label={t.reviews.sectionLabel}>
      <div className="text-center mb-14">
        <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-4 text-balance">
          {data.headline}
        </h2>
        <p className="text-ink-secondary text-lg mb-6">{data.subheadline}</p>

        {/* ── Aggregate Rating ──────────────────────────── */}
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 border border-brand-100 shadow-sm">
          <StarRating rating={data.averageRating} size="md" />
          <span className="font-display text-xl font-semibold text-brand-800">
            {data.averageRating}
          </span>
          <span className="text-sm text-ink-muted">
            {t.reviews.basedOn} {data.totalReviews} {t.reviews.reviews}
          </span>
        </div>
      </div>

      {/* ── Review Cards ────────────────────────────────── */}
      <motion.div
        className="grid md:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {data.items.map((review) => (
          <motion.div
            key={review.id}
            variants={fadeUp}
            className="bg-white rounded-2xl border border-brand-100 p-6 hover:shadow-md transition-shadow duration-300"
          >
            {/* Quote icon */}
            <svg
              className="w-8 h-8 text-brand-200 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>

            <p className="text-ink-secondary leading-relaxed mb-5 italic">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-brand-900 text-sm">
                    {review.name}
                  </p>
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </div>

              {review.source === "google" && (
                <span className="text-xs text-ink-muted bg-surface-warm px-2 py-1 rounded-md">
                  Google
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Leave a review CTA ──────────────────────────── */}
      <div className="text-center mt-10">
        <a
          href={data.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors"
        >
          {t.reviews.leaveReview}
          <Icon name="external-link" className="w-4 h-4" />
        </a>
      </div>
    </SectionWrapper>
  );
}
