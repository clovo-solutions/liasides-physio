"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import type { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
}

/* Deterministic brand/accent gradient cover used when an article
   has no featured image yet — keeps the grid polished pre-CMS. */
const COVER_GRADIENTS = [
  "from-brand-700 via-brand-600 to-brand-800",
  "from-accent-700 via-accent-600 to-brand-700",
  "from-brand-800 via-brand-700 to-accent-700",
  "from-brand-600 via-brand-700 to-brand-900",
];

export function ArticleCard({ article }: ArticleCardProps) {
  const { t } = useI18n();
  const gradient =
    COVER_GRADIENTS[
      Math.abs(hashString(article.id)) % COVER_GRADIENTS.length
    ];

  const formattedDate = new Date(article.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group card-surface overflow-hidden flex flex-col h-full">
      <a
        href={article.url || `#${article.slug}`}
        className="block focus-visible:outline-none"
        aria-label={article.title}
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5) 0, transparent 45%)",
                }}
              />
            </div>
          )}
          <span className="absolute top-3 left-3 text-xs font-semibold tracking-wide uppercase text-white bg-brand-950/55 backdrop-blur-sm rounded-full px-3 py-1">
            {article.category}
          </span>
        </div>
      </a>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-2">
          <time dateTime={article.date}>{formattedDate}</time>
          {article.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold text-brand-900 leading-snug mb-2 text-balance">
          <a
            href={article.url || `#${article.slug}`}
            className="transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:underline"
          >
            {article.title}
          </a>
        </h3>

        <p className="text-sm text-ink-secondary leading-relaxed flex-1">
          {article.excerpt}
        </p>

        <a
          href={article.url || `#${article.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors group/link"
        >
          {t.articles.readMore}
          <Icon
            name="arrow-up-right"
            className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  );
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
