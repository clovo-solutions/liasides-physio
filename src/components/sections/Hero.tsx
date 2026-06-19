"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { HeroData } from "@/lib/types";

interface HeroProps {
  data: HeroData;
  rating?: number;
  reviewCount?: number;
}

export function Hero({ data, rating, reviewCount }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
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
        {/* Dark scrim kept across the full height so the photo reads
            edge-to-edge and the headline + scroll cue stay legible.
            Darker at the very bottom to anchor the scroll indicator. */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/75 via-brand-950/30 to-brand-950/75" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto pt-28 pb-16 sm:pt-24 sm:pb-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="block w-8 h-px bg-accent-400/70" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80">
            {t.hero.decorativeLabel}
          </span>
          <span className="block w-8 h-px bg-accent-400/70" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-display-xl font-semibold text-white mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
        >
          {t.hero.headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-9 sm:mb-10 text-balance leading-relaxed drop-shadow-sm"
        >
          {t.hero.subheadline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href={data.ctaLink} size="lg" className="shadow-glow">
            {t.hero.ctaText}
          </Button>
          <Button href={data.secondaryCtaLink} variant="glass" size="lg">
            {t.hero.secondaryCtaText}
          </Button>
        </motion.div>

        {/* Live Google rating — instant trust signal above the fold */}
        {rating && reviewCount ? (
          <motion.a
            href="#reviews"
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white/90 hover:bg-white/15 transition-colors"
          >
            <StarRating rating={rating} size="sm" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
            <span className="h-3 w-px bg-white/25" />
            <span className="text-sm text-white/75">
              {reviewCount} {t.reviews.reviews} · Google
            </span>
          </motion.a>
        ) : null}
      </motion.div>

      {/* Scroll cue — sits on the dark lower scrim of the hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/60 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
