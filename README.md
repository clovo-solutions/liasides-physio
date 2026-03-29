# Agency Website Template

A production-ready, reusable website template built for web design agencies serving local service businesses. Config-driven, multilingual, and optimized for rapid client deployment.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (custom theme system)
- **Framer Motion** (scroll & interaction animations)
- **TypeScript** (full type safety)
- **JSON-based content** (single-file configuration)
- **i18n** (EN / GR / RU, extensible)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind + custom styles
│   ├── layout.tsx           # Root layout with SEO
│   └── page.tsx             # Home page (assembles sections)
├── components/
│   ├── layout/
│   │   └── Navbar.tsx       # Nav + language switcher
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Reviews.tsx
│   │   ├── Location.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx       # Reusable button
│       ├── Icon.tsx         # SVG icon system
│       ├── SectionWrapper.tsx
│       └── StarRating.tsx
├── data/
│   └── site.json            # ⭐ ALL BUSINESS CONTENT HERE
├── lib/
│   ├── animations.ts        # Framer Motion variants
│   ├── data.ts              # Data access layer (CMS-ready)
│   ├── i18n.tsx             # i18n context + provider
│   └── types.ts             # TypeScript interfaces
├── locales/
│   ├── en.json              # English UI strings
│   ├── gr.json              # Greek UI strings
│   └── ru.json              # Russian UI strings
sanity/
│   └── schemas.ts           # Sanity CMS schemas (future)
```

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/your-agency/agency-template.git client-name
cd client-name

# 2. Install dependencies
npm install

# 3. Edit client content
#    Open src/data/site.json and replace all business data

# 4. Run dev server
npm run dev
```

---

## Onboarding a New Client

### Step 1: Duplicate the Repo

```bash
# Option A: GitHub template repo
# Click "Use this template" on GitHub → creates a new repo

# Option B: Manual
git clone https://github.com/your-agency/agency-template.git new-client
cd new-client
rm -rf .git
git init
git remote add origin https://github.com/your-agency/new-client.git
```

### Step 2: Edit `src/data/site.json`

This is the **only file you need to change** for basic client setup. Update:

| Field | What to change |
|-------|---------------|
| `business.name` | Client business name |
| `business.tagline` | Their tagline |
| `seo.*` | Page title, description, keywords |
| `hero.*` | Hero headline, subheadline, CTA |
| `about.*` | About copy, features, therapist/owner info |
| `services.items[]` | All services with prices |
| `reviews.items[]` | Client testimonials |
| `location.*` | Address, coordinates, hours |
| `contact.*` | Phone, email, WhatsApp |
| `social.*` | Social media URLs |
| `footer.builtBy` | Your agency link |

### Step 3: Customize Colors (Optional)

Edit `tailwind.config.ts` → `colors.brand` to match client branding.

Quick palette swap: replace the `brand` color scale with any scale from [tailwindcss.com/docs/colors](https://tailwindcss.com/docs/customizing-colors).

### Step 4: Add Images

Replace placeholder images in `/public/images/`:
- `hero-bg.jpg` — Hero background
- `about.jpg` — About section image
- `therapist.jpg` — Team member photo
- `logo.svg` — Business logo
- `og-image.jpg` — Social share image (1200×630)

### Step 5: Deploy

```bash
git add .
git commit -m "Initial client setup"
git push origin main
```

---

## Deployment (Vercel)

### First-time Setup

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repo → Vercel auto-detects Next.js
4. Add environment variables from `.env.example` if needed
5. Click Deploy

### Subsequent Deploys

Every push to `main` auto-deploys. That's it.

### Custom Domain

1. In Vercel → Project → Settings → Domains
2. Add client domain (e.g., `physiovita.com`)
3. Update DNS: point CNAME to `cname.vercel-dns.com`

---

## Multilingual System

### How It Works

- **UI strings** (labels, buttons) → `/src/locales/{lang}.json`
- **Business content** (headlines, descriptions) → `/src/data/site.json`
- Language switcher in navbar toggles locale context
- Locale preference saved to localStorage

### Adding a New Language

1. Copy `src/locales/en.json` → `src/locales/de.json`
2. Translate all strings
3. In `src/lib/i18n.tsx`:
   ```typescript
   import de from "@/locales/de.json";

   export const LOCALES = {
     // ...existing
     de: { label: "Deutsch", flag: "🇩🇪" },
   };

   const TRANSLATIONS = {
     // ...existing
     de: de as Translations,
   };
   ```
4. Update the `Locale` type in `src/lib/types.ts`

### Translating Business Content

For full content translation, extend `site.json` with locale-specific overrides:
```json
{
  "hero": {
    "headline": "English headline",
    "headline_gr": "Greek headline",
    "headline_ru": "Russian headline"
  }
}
```

Or use Sanity's built-in i18n plugin for CMS-managed translations.

---

## CMS Integration (Sanity)

### When to Migrate

Move to Sanity when:
- Client needs to edit content themselves
- You have 10+ clients and want centralized management
- You need scheduled publishing or draft previews

### How to Migrate

1. **Set up Sanity Studio:**
   ```bash
   npx create-sanity@latest --template clean
   ```

2. **Copy schemas** from `/sanity/schemas.ts` into the Sanity project

3. **Update `/src/lib/data.ts`:**
   Replace JSON imports with GROQ queries (examples in the file)

4. **Deploy Sanity Studio** to `studio.youragency.com`

The component interfaces stay the same — only the data layer changes.

---

## Automation Pipeline

### How to Automate Client Onboarding

```
Client fills form → AI populates site.json → Auto-deploy
```

#### Implementation:

1. **Intake Form** (Typeform, Tally, or custom):
   Collect: business name, tagline, services, address, phone, etc.

2. **AI Processing** (OpenAI / Claude API):
   ```javascript
   // Generate site.json from form data
   const siteConfig = await generateSiteConfig(formData);
   // Enhance descriptions, generate SEO copy
   ```

3. **GitHub API** — Create repo from template:
   ```bash
   # Use GitHub's template repo API
   POST /repos/{template}/generate
   ```

4. **Write site.json** to the new repo:
   ```bash
   # GitHub Contents API
   PUT /repos/{new-repo}/contents/src/data/site.json
   ```

5. **Vercel auto-deploys** from the push

#### Full pipeline (Node.js pseudocode):
```javascript
async function onboardClient(formData) {
  // 1. Generate content
  const siteJson = await aiGenerateContent(formData);

  // 2. Create repo from template
  const repo = await github.createFromTemplate('agency-template', formData.slug);

  // 3. Push site.json
  await github.updateFile(repo, 'src/data/site.json', JSON.stringify(siteJson));

  // 4. Vercel deploys automatically
  return `https://${formData.slug}.vercel.app`;
}
```

---

## Performance Optimizations

- **Font loading**: Google Fonts with `display=swap`
- **Images**: Use Next.js `<Image>` component for auto-optimization
- **Animations**: `viewport={{ once: true }}` — animate only on first view
- **CSS**: Tailwind purges unused styles in production
- **Bundle**: No heavy icon libraries — inline SVGs only
- **Lazy loading**: Map iframe uses `loading="lazy"`

### Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 100 |
| SEO | 100 |

---

## SEO Checklist

- [x] Dynamic meta tags from `site.json`
- [x] Open Graph image support
- [x] Twitter card meta
- [x] JSON-LD structured data (LocalBusiness schema)
- [x] Semantic HTML throughout
- [x] Accessible form labels
- [x] Alt text placeholders for images
- [ ] Sitemap (add `next-sitemap` package)
- [ ] robots.txt (auto-generated by Next.js)

---

## Scaling Notes for Agency Use

1. **Monorepo approach**: Use Turborepo to manage multiple client sites with shared components
2. **Design tokens**: Extract colors/fonts into a shared `@agency/tokens` package
3. **Component library**: Promote battle-tested components to a shared `@agency/ui` package
4. **Client dashboard**: Build an admin panel that writes to `site.json` via API
5. **Template variants**: Create industry-specific `site.json` presets (dental, salon, restaurant)

---

## License

Private — for agency internal use.
