import type { SiteData } from "./types";
import siteDataJson from "@/data/site.json";

/* ─────────────────────────────────────────────────────────
   Data Access Layer

   Currently reads from /data/site.json.
   When migrating to Sanity CMS, replace these functions
   with GROQ queries. The component interfaces stay the same.

   Example Sanity replacement:
   ─────────────────────────
   import { client } from '@/sanity/client'

   export async function getSiteData(): Promise<SiteData> {
     return client.fetch(`*[_type == "siteSettings"][0]{
       business->,
       seo,
       hero,
       about{ ..., features[], therapist },
       services{ ..., items[] },
       reviews{ ..., items[] },
       location,
       contact,
       social,
       footer,
       theme
     }`)
   }
   ───────────────────────────────────────────────────────── */

export function getSiteData(): SiteData {
  return siteDataJson as unknown as SiteData;
}

export function getBusinessName(): string {
  return siteDataJson.business.name;
}

export function getSEO() {
  return siteDataJson.seo;
}
