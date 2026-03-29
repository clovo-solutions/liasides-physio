"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { HeroData } from "@/lib/types";

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* ── Background Image ───────────────────────────────
           Place your image at the path defined in site.json:
           public/images/hero-bg.jpg

           Recommended size: 1920×1080 or larger.
           Next/Image handles responsive sizing + WebP.      */}
      <div className="absolute inset-0">
        <Image
          src={data.backgroundImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />

        {/* Gradient overlay — darkens image so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-brand-950/40 to-surface/95" />

        {/* Subtle grain texture over the image */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Decorative blurred blobs ──────────────────────── */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-brand-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-brand-400/8 rounded-full blur-3xl" />

      {/* ── Content ────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto pt-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative label */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="block w-8 h-px bg-white/40" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
            {data.subheadline.split(" ").slice(0, 3).join(" ")}
          </span>
          <span className="block w-8 h-px bg-white/40" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-display-xl font-semibold text-white text-balance leading-[1.08] mb-6 drop-shadow-sm"
        >
          {data.headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 text-balance leading-relaxed"
        >
          {data.subheadline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href={data.ctaLink} size="lg">
            {t.hero.ctaText}
          </Button>
          <Button href={data.secondaryCtaLink} variant="secondary" size="lg">
            {t.hero.secondaryCtaText}
          </Button>
        </motion.div>

        {/* ── Scroll indicator ───────────────────────────── */}
        <motion.div variants={fadeUp} className="mt-16 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
