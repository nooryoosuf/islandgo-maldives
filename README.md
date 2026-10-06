# IslandGo Maldives — Travel Discovery Website

Ocean blue + sunset orange · white space · real photography · rounded UI.

**Scope:** travel discovery + destinations + stays + experiences + packages + guides + enquiries.
**Explicitly out of scope (by design):** booking engines, payments, live availability, flight/hotel APIs, accounts.

**Local URL:** http://localhost:5173/

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + sitemap + vite build → dist/
npm run sitemap  # regenerate public/sitemap.xml from src/data slugs
```

Copy `.env.example` to `.env` to override `VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER`,
`VITE_CONTACT_EMAIL`, `VITE_ANALYTICS_ID` (all public-safe; never put secrets in frontend code).

## Deploying to Cloudflare Pages

The repo is Cloudflare-ready (`public/_redirects` SPA fallback, `public/_headers`
security + asset caching, sitemap generated at build time).

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** →
   select `islandgo-maldives`.
2. Build settings: Framework preset **Vite** (or custom):
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 20+ (Pages → Settings → Runtime, or `NODE_VERSION=20` env var).
3. Environment variables (Pages → Settings → Variables, Production):
   - `VITE_SITE_URL` = `https://YOUR-DOMAIN` (used for canonical URLs + sitemap —
     redeploy after changing it so `sitemap.xml` regenerates with the right domain).
   - `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL` as needed.
4. Deploy — you get `https://islandgo-maldives.pages.dev` instantly.
5. Custom domain (domain already on Cloudflare): Pages project → **Custom domains →
   Set up a custom domain** → enter `YOUR-DOMAIN` (and `www.YOUR-DOMAIN`) →
   Cloudflare adds DNS + provisions HTTPS automatically. Then add a redirect
   `www` → apex (or vice versa) under **Rules → Redirect Rules** so only one
   canonical host serves the site.
6. Optional: turn on **Cloudflare Web Analytics** (privacy-friendly, free) and
   **Email Routing** for `hello@YOUR-DOMAIN` forwarding.

## Structure

- `src/config/site.ts` — brand, contact, social, URLs, theme. Single handover point.
- `src/data/` — structured content (destinations, properties, packages, experiences, articles, offers, images). Adding an item here automatically surfaces it in listings + related sections + sitemap.
- `src/lib/` — `whatsapp.ts` (one contextual WA system), `analytics.ts` (consent-gated, provider-swappable), `seo.tsx` (per-page SEO + JSON-LD), `search.ts`, `utils.ts` (validation/sanitise/currency), `../i18n/strings.ts` (translation-ready copy stub).
- `src/components/` — `layout.tsx`, `ui.tsx` (cards/heroes/CTA/gallery), `forms.tsx` (validated forms), `feedback.tsx` (ErrorBoundary, EmptyState, SmartImage, CookieBanner, SkipLink), `RouteMeta.tsx` (unique title/desc/canonical/OG + schema per route).
- `src/pages/` — Home, Explore, Trips, Info, Search, Legal (privacy/terms/cookies drafts).
- `scripts/generate-sitemap.mjs` — builds `public/sitemap.xml` (51 URLs) from data slugs on every build.
- `public/` — favicon.svg, apple-touch-icon.svg, manifest, robots.txt, sitemap.xml, `_redirects` (+ `vercel.json` SPA fallback + security headers).

## Production notes

- SEO: unique title/description/canonical + OG/Twitter per route; TravelAgency org schema in `index.html`; Breadcrumb/Hotel/TouristDestination/Article/FAQ JSON-LD per detail page.
- Images: `SmartImage` (srcset/sizes/lazy, hero eager) + onError fallbacks; decorative hero imgs marked `aria-hidden`.
- Forms: labels, inline errors, loading/success/failure states, duplicate-submit guard, sanitised inputs.
- Privacy: analytics only after cookie-banner consent; legal pages are marked drafts.
- Prices are indicative USD "from" hints via `formatCurrency()` — multi-currency ready, no fake conversion.
