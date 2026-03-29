"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { AboutData } from "@/lib/types";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const { t } = useI18n();

  return (
    <SectionWrapper id="about" label={t.about.sectionLabel}>
      {/* ── Headline + Description ──────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-6 text-balance">
            {data.headline}
          </h2>
          <p className="text-ink-secondary text-lg leading-relaxed mb-8">
            {data.description}
          </p>

          {/* ── Therapist Card ──────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-100 shadow-sm"
          >
            <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-display text-xl font-semibold shrink-0">
              {data.therapist.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-brand-900">
                {data.therapist.name}
              </p>
              <p className="text-sm text-ink-secondary">{data.therapist.title}</p>
            </div>
          </motion.div>
        </div>

        {/* ── Features Grid ────────────────────────────── */}
        <motion.div
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {data.features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group p-6 bg-white rounded-2xl border border-brand-100 hover:border-brand-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors shrink-0">
                  <Icon name={feature.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
