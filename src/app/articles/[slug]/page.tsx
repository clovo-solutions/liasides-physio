import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getSiteData,
  getArticles,
  getArticleMeta,
  getSEO,
} from "@/lib/data";
import { getArticleContent } from "@/data/articles";
import { ArticleTopBar } from "@/components/article/ArticleTopBar";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import en from "@/locales/en.json";

const chrome = en.articlePage;

/* Pre-render every article at build time. */
export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleMeta(params.slug);
  const seo = getSEO();
  if (!article) {
    return { title: "Article not found" };
  }
  const url = `/articles/${article.slug}`;
  return {
    title: `${article.title} | Liasides Physio`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${seo.url}${url}`,
      publishedTime: article.date,
      section: article.category,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleMeta(params.slug);
  const content = getArticleContent(params.slug);
  if (!article || !content) {
    notFound();
  }

  const site = getSiteData();
  const seo = getSEO();
  const related = getArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const articleUrl = `${seo.url}/articles/${article.slug}`;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    articleSection: article.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    author: { "@type": "Person", name: content.author },
    publisher: {
      "@type": "Organization",
      name: site.business.name,
      logo: { "@type": "ImageObject", url: `${seo.url}${site.business.logo}` },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: seo.url },
      {
        "@type": "ListItem",
        position: 2,
        name: chrome.allInsights,
        item: `${seo.url}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ArticleTopBar businessName={site.business.name} />

      <main className="bg-surface">
        <article>
          {/* ── Header ─────────────────────────────────────── */}
          <header className="px-5 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-8">
            <div className="max-w-[68ch] mx-auto">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-sm text-ink-muted mb-6"
              >
                <a href="/" className="hover:text-brand-700 transition-colors">
                  Home
                </a>
                <span aria-hidden="true">/</span>
                <a
                  href="/articles"
                  className="hover:text-brand-700 transition-colors"
                >
                  {chrome.allInsights}
                </a>
              </nav>

              <span className="eyebrow mb-4">{article.category}</span>
              <h1 className="font-display text-display-lg font-semibold text-brand-900 text-balance mb-5">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                <span>
                  {chrome.writtenBy} {content.author}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.readingTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* ── Cover band ─────────────────────────────────── */}
          <div className="px-5 sm:px-8 lg:px-16 mb-10">
            <div className="max-w-[80ch] mx-auto">
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-700">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 80ch) 100vw, 80ch"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.55) 0, transparent 45%)",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────── */}
          <div className="px-5 sm:px-8 lg:px-16">
            <div className="max-w-[68ch] mx-auto">
              <p className="font-display text-xl sm:text-2xl text-brand-900 leading-relaxed text-pretty mb-10">
                {content.intro}
              </p>

              <ArticleBody blocks={content.body} />

              {/* Key takeaways */}
              <aside className="mt-12 rounded-3xl border border-brand-100 bg-white shadow-card p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-brand-900 mb-4 flex items-center gap-2">
                  <Icon name="clipboard" className="w-5 h-5 text-accent-600" />
                  {chrome.keyTakeaways}
                </h2>
                <ul className="space-y-3">
                  {content.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-accent-600 mt-0.5 shrink-0"
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
                      <span className="text-ink-secondary leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* References */}
              {content.references.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-600 mb-3">
                    {chrome.references}
                  </h2>
                  <ul className="space-y-2">
                    {content.references.map((ref, i) => (
                      <li key={i} className="text-sm text-ink-secondary">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-1.5 text-brand-700 hover:text-brand-900 transition-colors"
                        >
                          <span>{ref.label}</span>
                          <Icon
                            name="external-link"
                            className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Author / reviewer + disclaimer */}
              <div className="mt-10 pt-6 border-t border-brand-100 text-sm text-ink-muted space-y-3">
                {content.reviewedBy && (
                  <p>
                    {chrome.medicallyReviewed} {content.reviewedBy}.
                  </p>
                )}
                <p className="italic">{chrome.disclaimer}</p>
              </div>
            </div>
          </div>

          {/* ── CTA band ───────────────────────────────────── */}
          <div className="px-5 sm:px-8 lg:px-16 mt-16">
            <div className="container-narrow">
              <div className="rounded-3xl bg-brand-900 text-white px-6 py-10 sm:px-12 sm:py-12 text-center">
                <h2 className="font-display text-display-md font-semibold mb-3 text-balance">
                  {chrome.ctaTitle}
                </h2>
                <p className="text-white/75 max-w-xl mx-auto mb-7">
                  {chrome.ctaText}
                </p>
                <Button href="/#booking" size="lg" className="shadow-glow">
                  {chrome.ctaButton}
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* ── Related reading ──────────────────────────────── */}
        {related.length > 0 && (
          <section className="px-5 sm:px-8 lg:px-16 py-16">
            <div className="container-narrow">
              <h2 className="font-display text-display-md font-semibold text-brand-900 mb-8">
                {chrome.relatedReading}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer data={site.footer} business={site.business} social={site.social} />
    </>
  );
}
