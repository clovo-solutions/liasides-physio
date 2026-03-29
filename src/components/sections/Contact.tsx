"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { ContactData, SocialLinks } from "@/lib/types";

interface ContactProps {
  data: ContactData;
  social: SocialLinks;
}

export function Contact({ data, social }: ContactProps) {
  const { t } = useI18n();

  return (
    <SectionWrapper id="contact" label={t.contact.sectionLabel}>
      <div className="text-center mb-14">
        <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-4 text-balance">
          {t.contact.headline}
        </h2>
        <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
          {t.contact.subheadline}
        </p>
      </div>

      <motion.div
        className="flex flex-col items-center gap-6 max-w-md mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.a
          href={`tel:${data.phone.replace(/\s/g, "")}`}
          variants={fadeUp}
          className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-brand-100 hover:border-brand-200 hover:shadow-sm transition-all group w-full"
        >
          <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors shrink-0">
            <Icon name="phone" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-ink-muted mb-0.5">
              {t.contact.orCallUs}
            </p>
            <p className="font-medium text-brand-800">{data.phone}</p>
          </div>
        </motion.a>

        <motion.a
          href={`mailto:${data.email}`}
          variants={fadeUp}
          className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-brand-100 hover:border-brand-200 hover:shadow-sm transition-all group w-full"
        >
          <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors shrink-0">
            <Icon name="mail" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-ink-muted mb-0.5">
              {t.contact.orEmailUs}
            </p>
            <p className="font-medium text-brand-800">{data.email}</p>
          </div>
        </motion.a>

        <motion.div variants={fadeUp} className="flex gap-3 pt-2">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white border border-brand-100 flex items-center justify-center text-ink-secondary hover:text-brand-700 hover:border-brand-300 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          )}
          {social.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white border border-brand-100 flex items-center justify-center text-ink-secondary hover:text-brand-700 hover:border-brand-300 transition-all"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
