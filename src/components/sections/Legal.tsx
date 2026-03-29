"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { getSiteData } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalProps {
  titleKey: string;
  lastUpdatedKey: string;
  sections: LegalSection[];
}

export function Legal({ titleKey, lastUpdatedKey, sections }: LegalProps) {
  const { t } = useI18n();
  const data = getSiteData();

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="bg-brand-950 pt-28 pb-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.legal.backToHome}
          </a>
          <h1 className="font-display text-display-md font-semibold text-white">
            {titleKey}
          </h1>
          <p className="text-sm text-white/40 mt-3">{lastUpdatedKey}</p>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────── */}
      <motion.div
        className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {sections.map((section, i) => (
          <motion.div key={i} variants={fadeUp} className="mb-10">
            <h2 className="font-display text-lg font-semibold text-brand-900 mb-3">
              {section.title}
            </h2>
            <div className="text-ink-secondary text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        ))}

        {/* ── Contact for questions ─────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-12 p-6 bg-surface-warm rounded-2xl border border-brand-100"
        >
          <p className="text-sm text-ink-secondary">
            {t.legal.questions}{" "}
            <a
              href={`mailto:${data.contact.email}`}
              className="text-brand-600 hover:text-brand-800 font-medium transition-colors"
            >
              {data.contact.email}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
