/* ─────────────────────────────────────────────────────────
   Type definitions for the site data system.
   These types mirror the structure in /data/site.json.
   When integrating Sanity CMS, these become your
   TypeScript interfaces for GROQ query results.
   ───────────────────────────────────────────────────────── */

export type Locale = "en" | "gr" | "ru";

export interface SiteData {
  business: BusinessInfo;
  seo: SEOData;
  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  reviews: ReviewsData;
  location: LocationData;
  therapist: TherapistSectionData;
  booking: BookingData;
  contact: ContactData;
  social: SocialLinks;
  footer: FooterData;
  theme: ThemeConfig;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  type: string;
  foundedYear: number;
  logo: string;
  favicon: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  url: string;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImage: string;
}

export interface AboutFeature {
  title: string;
  description: string;
  icon: string;
}

export interface TherapistInfo {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface AboutData {
  headline: string;
  description: string;
  features: AboutFeature[];
  image: string;
  therapist: TherapistInfo;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}

export interface ServicesData {
  headline: string;
  subheadline: string;
  items: ServiceItem[];
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: "google" | "manual";
}

export interface ReviewsData {
  headline: string;
  subheadline: string;
  averageRating: number;
  totalReviews: number;
  googleReviewsUrl: string;
  items: ReviewItem[];
}

export interface LocationAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface BusinessHours {
  days: string;
  time: string;
}

export interface LocationData {
  headline: string;
  address: LocationAddress;
  coordinates: { lat: number; lng: number };
  mapZoom: number;
  hours: BusinessHours[];
  parking: string;
}

export interface TherapistSectionData {
  headline: string;
  name: string;
  title: string;
  bio: string;
  credentials: string[];
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface BookingData {
  enabled: boolean;
  type: "calendly";
  url: string;
  mode: "embed" | "popup";
  headline: string;
  subheadline: string;
}

export interface ContactData {
  headline: string;
  subheadline: string;
  phone: string;
  email: string;
  whatsapp: string;
  formFields: string[];
  formSubmitText: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  tiktok?: string;
}

export interface FooterData {
  copyright: string;
  privacyPolicyUrl: string;
  termsUrl: string;
  builtBy: {
    name: string;
    url: string;
  };
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor?: string;
  surfaceColor?: string;
  inkColor?: string;
  fontDisplay: string;
  fontBody: string;
}

/* ── Locale/Translation types ──────────────────────────── */
export interface Translations {
  nav: Record<string, string>;
  hero: Record<string, string>;
  about: Record<string, string>;
  services: Record<string, string>;
  reviews: Record<string, string>;
  location: Record<string, string>;
  therapist: Record<string, string>;
  booking: Record<string, string>;
  contact: Record<string, string>;
  footer: Record<string, string>;
  common: Record<string, string>;
}
