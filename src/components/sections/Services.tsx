"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { ServicesData } from "@/lib/types";

interface ServicesProps {
  data: ServicesData;
}

export function Services({ data }: ServicesProps) {
  const { t } = useI18n();

  return (
    <SectionWrapper id="services" label={t.services.sectionLabel} background="warm">
      <div className="text-center mb-14">
        <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-4 text-balance">
          {data.headline}
        </h2>
        <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
          {data.subheadline}
        </p>
      </div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {data.items.map((service) => (
          <motion.div
            key={service.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="group relative bg-white rounded-2xl border border-brand-100 p-6 hover:shadow-lg hover:border-brand-200 transition-all duration-300 cursor-default"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-5 group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
              <Icon name={service.icon} className="w-6 h-6" />
            </div>

            {/* Content */}
            <h3 className="font-semibold text-brand-900 text-lg mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Price tag */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-50">
              <span className="font-display text-xl font-semibold text-brand-700">
                {service.price}
              </span>
              <span className="text-xs text-ink-muted">{t.services.perSession}</span>
            </div>

            {/* Hover accent */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
