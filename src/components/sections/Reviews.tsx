"use client";

import { motion, LayoutGroup } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { ReviewsData } from "@/lib/types";

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
      <LayoutGroup>
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
              layout
              variants={fadeUp}
              transition={{
                layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>

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
