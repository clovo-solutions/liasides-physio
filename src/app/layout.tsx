import type { Metadata } from "next";
import { getSEO, getBusinessName, getSiteData } from "@/lib/data";
import { getReviewsData } from "@/lib/googleReviews";
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

/* ── Structured Data ─────────────────────────────────────
   This JSON-LD tells Google exactly what this business is,
   where it is, what it offers, and how well it's rated.

   It pulls data from site.json so it stays in sync
   when you update content for a new client.

   All fields map to: https://schema.org/Physiotherapy     */

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Physiotherapy",
  name: siteData.business.name,
  description: seo.description,
  url: seo.url,
  image: seo.ogImage,
  telephone: siteData.contact.phone,
  email: siteData.contact.email,
  founder: {
    "@type": "Person",
    name: siteData.therapist.name,
    jobTitle: siteData.therapist.title,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteData.location.address.street,
    addressLocality: siteData.location.address.city,
    postalCode: siteData.location.address.postalCode,
    addressCountry: siteData.location.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteData.location.coordinates.lat,
    longitude: siteData.location.coordinates.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteData.reviews.averageRating,
    bestRating: 5,
    reviewCount: siteData.reviews.totalReviews,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Physiotherapy Services",
    itemListElement: siteData.services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
  sameAs: [
    siteData.social.instagram,
    siteData.social.facebook,
    siteData.social.linkedin,
  ].filter(Boolean),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep the JSON-LD aggregateRating in sync with the live Google values.
  const reviews = await getReviewsData();
  const ldJson = {
    ...structuredData,
    aggregateRating: {
      ...structuredData.aggregateRating,
      ratingValue: reviews.averageRating,
      reviewCount: reviews.totalReviews,
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ldJson),
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
