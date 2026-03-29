"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { StarRating } from "@/components/ui/StarRating";
import type { ReviewItem } from "@/lib/types";

const TRUNCATE_LENGTH = 140;

interface ReviewCardProps {
  review: ReviewItem;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const isLong = review.text.length > TRUNCATE_LENGTH;
  const truncatedText = isLong
    ? review.text.slice(0, TRUNCATE_LENGTH).trimEnd() + "…"
    : review.text;

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="bg-white rounded-2xl border border-brand-100 p-6 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Quote icon */}
      <svg
        className="w-8 h-8 text-brand-200 mb-4 shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
      </svg>

      {/* Review text — plain element, no layout animation on text */}
      <div className="mb-5 flex-1">
        <p className="text-ink-secondary leading-relaxed italic">
          &ldquo;{expanded ? review.text : truncatedText}&rdquo;
        </p>

        {isLong && (
          <button
            type="button"
            onClick={() => {
              setExpanded((prev) => !prev);
            }}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800 transition-colors cursor-pointer"
          >
            <span>{expanded ? t.reviews.showLess : t.reviews.showMore}</span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
        )}
      </div>

      {/* Reviewer info — layout animated so it slides down smoothly */}
      <motion.div
        layout
        className="flex items-center justify-between mt-auto pt-4 border-t border-brand-50"
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
            {review.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-medium text-brand-900 text-sm">{review.name}</p>
            <StarRating rating={review.rating} size="sm" />
          </div>
        </div>

        {review.source === "google" && (
          <span className="text-xs text-ink-muted bg-surface-warm px-2 py-1 rounded-md">
            Google
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
