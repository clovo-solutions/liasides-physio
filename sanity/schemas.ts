/* ─────────────────────────────────────────────────────────
   Sanity CMS Schemas — For Future Integration

   These schemas mirror the structure in /data/site.json.
   When ready to integrate Sanity:

   1. npx create-sanity@latest
   2. Copy these schemas into /sanity/schemas/
   3. Replace getSiteData() in /lib/data.ts with GROQ queries
   4. Deploy Sanity Studio

   Each schema below corresponds to a section of site.json.
   ───────────────────────────────────────────────────────── */

// ── schema: business.ts ─────────────────────────────────
export const business = {
  name: "business",
  title: "Business Info",
  type: "document",
  fields: [
    { name: "name", title: "Business Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 3 },
    { name: "type", title: "Business Type", type: "string", options: { list: ["physiotherapy", "dental", "salon", "restaurant", "gym", "other"] } },
    { name: "foundedYear", title: "Founded Year", type: "number" },
    { name: "logo", title: "Logo", type: "image" },
  ],
};

// ── schema: service.ts ──────────────────────────────────
export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "description", title: "Description", type: "text", rows: 3 },
    { name: "icon", title: "Icon Name", type: "string", description: "Icon identifier (e.g. activity, shield, target)" },
    { name: "price", title: "Price", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};

// ── schema: review.ts ───────────────────────────────────
export const review = {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    { name: "name", title: "Reviewer Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "rating", title: "Rating", type: "number", validation: (Rule: any) => Rule.min(1).max(5) },
    { name: "text", title: "Review Text", type: "text", rows: 4 },
    { name: "date", title: "Review Date", type: "date" },
    { name: "source", title: "Source", type: "string", options: { list: ["google", "manual"] } },
  ],
};

// ── schema: siteSettings.ts ─────────────────────────────
export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "hero", title: "Hero Section", type: "object", fields: [
      { name: "headline", title: "Headline", type: "string" },
      { name: "subheadline", title: "Subheadline", type: "text", rows: 2 },
      { name: "backgroundImage", title: "Background Image", type: "image" },
    ]},
    { name: "about", title: "About Section", type: "object", fields: [
      { name: "headline", title: "Headline", type: "string" },
      { name: "description", title: "Description", type: "text", rows: 5 },
    ]},
    { name: "contact", title: "Contact Info", type: "object", fields: [
      { name: "phone", title: "Phone", type: "string" },
      { name: "email", title: "Email", type: "string" },
      { name: "whatsapp", title: "WhatsApp", type: "string" },
    ]},
    { name: "location", title: "Location", type: "object", fields: [
      { name: "street", title: "Street", type: "string" },
      { name: "city", title: "City", type: "string" },
      { name: "postalCode", title: "Postal Code", type: "string" },
      { name: "country", title: "Country", type: "string" },
      { name: "lat", title: "Latitude", type: "number" },
      { name: "lng", title: "Longitude", type: "number" },
    ]},
    { name: "social", title: "Social Media", type: "object", fields: [
      { name: "instagram", title: "Instagram URL", type: "url" },
      { name: "facebook", title: "Facebook URL", type: "url" },
      { name: "linkedin", title: "LinkedIn URL", type: "url" },
    ]},
  ],
};

/* ── GROQ Query Examples ─────────────────────────────────

   // Fetch all site data:
   const siteData = await client.fetch(`
     *[_type == "siteSettings"][0]{
       hero,
       about,
       contact,
       location,
       social,
       "services": *[_type == "service"] | order(order asc) {
         title, description, icon, price
       },
       "reviews": *[_type == "review"] | order(date desc) {
         name, rating, text, date, source
       }
     }
   `)

   // Fetch just reviews (for API route / ISR):
   const reviews = await client.fetch(`
     *[_type == "review"] | order(date desc) [0..10] {
       name, rating, text, date, source
     }
   `)

   ───────────────────────────────────────────────────────── */
