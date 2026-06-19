"use client";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ReadingProgress } from "./ReadingProgress";

interface ArticleTopBarProps {
  businessName: string;
}

export function ArticleTopBar({ businessName }: ArticleTopBarProps) {
  const { t } = useI18n();

  return (
    <>
      <ReadingProgress />
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-brand-100">
        <div className="container-narrow mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <a
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-brand-800"
            >
              {businessName}
            </a>

            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/articles"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-brand-700 transition-colors"
              >
                <Icon name="arrow-left" className="w-4 h-4" />
                {t.articlePage.allInsights}
              </a>
              <Button href="/#booking" size="sm">
                {t.articlePage.ctaButton}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
