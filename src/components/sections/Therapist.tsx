"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  slideInLeft,
  slideInRight,
  fadeUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import type { TherapistSectionData } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   Therapist / Owner Section

   A dedicated spotlight section for the business owner or
   lead practitioner. Reads all content from site.json.

   Reusable for any service business — the "therapist"
   naming is generic (could be a dentist, trainer, chef…).

   CMS migration:
   Replace props with a Sanity GROQ query result:
   const therapist = await client.fetch(
     `*[_type == "therapist"][0]{ name, title, bio, credentials, image }`
   )
   ───────────────────────────────────────────────────────── */

interface TherapistProps {
  data: TherapistSectionData;
}

export function Therapist({ data }: TherapistProps) {
  const { t } = useI18n();

  return (
    <SectionWrapper id="therapist" label={t.therapist.sectionLabel}>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* ── Image Side ───────────────────────────────────── */}
        <motion.div
          className="relative"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Main image container */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-100">
            {/* Placeholder / actual image ────────────────────
                Replace this div with <Image> from next/image
                once real client photos are provided:

                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                ─────────────────────────────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-200/60 via-brand-300/40 to-brand-400/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <Icon name="user" className="w-12 h-12 text-brand-700" />
                </div>
                <p className="text-sm font-medium text-brand-800/70">
                  {data.image}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative accent — subtle floating card */}
          <motion.div
            className="absolute -bottom-4 -right-4 lg:-right-6 bg-white rounded-2xl border border-brand-100 shadow-lg px-5 py-4 z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <Icon name="clipboard" className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-900">15+</p>
                <p className="text-xs text-ink-muted">
                  {t.therapist.yearsExperience}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Text Side ────────────────────────────────────── */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Headline */}
          <h2 className="font-display text-display-lg font-semibold text-brand-900 mb-3 text-balance">
            {data.headline}
          </h2>

          {/* Name + title */}
          <div className="mb-6">
            <p className="text-xl font-semibold text-brand-800">{data.name}</p>
            <p className="text-sm text-ink-secondary mt-1">{data.title}</p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-10 h-px bg-brand-300" />
            <span className="block w-2 h-2 rounded-full bg-brand-400" />
            <span className="block w-10 h-px bg-brand-300" />
          </div>

          {/* Bio */}
          <p className="text-ink-secondary text-base leading-relaxed mb-8">
            {data.bio}
          </p>

          {/* Credentials */}
          {data.credentials.length > 0 && (
            <motion.div
              className="mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-600 mb-4">
                {t.therapist.credentials}
              </h3>
              <div className="space-y-2.5">
                {data.credentials.map((credential, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center mt-0.5 shrink-0">
                      <svg
                        className="w-3 h-3 text-brand-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-ink-secondary leading-snug">
                      {credential}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <Button href={data.ctaLink} size="lg">
            {data.ctaText}
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
