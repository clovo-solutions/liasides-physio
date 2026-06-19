"use client";

import { clsx } from "clsx";
import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Icon } from "@/components/ui/Icon";
import type { Article } from "@/lib/types";

interface ArticlesProps {
  data: Article[];
}

export function Articles({ data }: ArticlesProps) {
  const { t } = useI18n();
  const { ref, isInView } = useInView();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="articles" background="warm">
      <SectionHeading
        eyebrow={t.articles.sectionLabel}
        title={t.articles.headline}
        subtitle={t.articles.subheadline}
      />

      <div
        ref={ref}
        className={clsx(
          "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 stagger",
          isInView && "in-view"
        )}
      >
        {data.map((article) => (
          <div
            key={article.id}
            className={clsx("anim-fade-up h-full", isInView && "in-view")}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
        >
          {t.articles.viewAll}
          <Icon name="arrow-right" className="w-4 h-4" />
        </a>
      </div>
    </SectionWrapper>
  );
}
