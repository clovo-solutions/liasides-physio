import type { Metadata } from "next";
import { getSEO, getBusinessName, getSiteData } from "@/lib/data";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const seo = getSEO();
const siteData = getSiteData();

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: getBusinessName(),
    images: [{ url: seo.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthBusiness",
              name: getBusinessName(),
              description: seo.description,
              url: seo.url,
              image: seo.ogImage,
            }),
          }}
        />
      </head>
      <body className="bg-surface text-ink font-body antialiased">
        <ThemeProvider theme={siteData.theme}>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
