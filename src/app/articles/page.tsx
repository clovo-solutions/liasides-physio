import type { Metadata } from "next";
import { getSiteData, getArticles, getSEO } from "@/lib/data";
import { ArticleTopBar } from "@/components/article/ArticleTopBar";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Footer } from "@/components/sections/Footer";
import en from "@/locales/en.json";

export function generateMetadata(): Metadata {
  const seo = getSEO();
  return {
    title: `${en.articles.headline} | Liasides Physio`,
    description: en.articles.subheadline,
    alternates: { canonical: "/articles" },
    openGraph: {
      type: "website",
      title: `${en.articles.headline} | Liasides Physio`,
      description: en.articles.subheadline,
      url: `${seo.url}/articles`,
    },
  };
}

export default function ArticlesIndexPage() {
  const site = getSiteData();
  const articles = getArticles();

  return (
    <>
      <ArticleTopBar businessName={site.business.name} />

      <main className="bg-surface">
        <header className="px-5 sm:px-8 lg:px-16 pt-16 pb-10 text-center">
          <span className="eyebrow justify-center mb-4">
            {en.articles.sectionLabel}
          </span>
          <h1 className="font-display text-display-lg font-semibold text-brand-900 text-balance mb-4">
            {en.articles.headline}
          </h1>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto text-pretty">
            {en.articles.subheadline}
          </p>
        </header>

        <section className="px-5 sm:px-8 lg:px-16 pb-20">
          <div className="container-narrow">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer data={site.footer} business={site.business} social={site.social} />
    </>
  );
}
