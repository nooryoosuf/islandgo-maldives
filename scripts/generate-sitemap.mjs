// Generates public/sitemap.xml from the structured content system.
// Run: `npm run sitemap` (also runs automatically on `npm run build`).
// Source of truth = src/data/*.ts slugs (no manual URL list to drift).
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.VITE_SITE_URL || 'https://islandgo.mv').replace(/\/$/, '')

function slugs(file, exportName) {
  const src = readFileSync(resolve(root, file), 'utf8')
  const re = /slug:\s*['"]([^'"]+)['"]/g
  const out = []
  let m
  while ((m = re.exec(src))) out.push(m[1])
  return [...new Set(out)]
}

// Category landing pages (source of truth: src/lib/categories.ts — keep in sync).
const packageCats = ['honeymoon', 'family', 'luxury', 'adventure', 'budget', 'island-hopping', 'diving', 'surfing']
const expCats = ['diving', 'snorkelling', 'surfing', 'island-trips', 'cruises', 'fishing', 'culture']
const stayCats = ['resorts', 'hotels', 'local-islands']

const routes = [
  '/',
  '/destinations',
  '/stays',
  '/packages',
  '/experiences',
  '/guide',
  '/offers',
  '/about',
  '/contact',
  '/plan-trip',
  '/search',
  '/privacy',
  '/terms',
  '/cookies',
  ...slugs('src/data/destinations.ts').map((s) => `/destinations/${s}`),
  ...slugs('src/data/properties.ts').map((s) => `/stays/${s}`),
  ...slugs('src/data/packages.ts').map((s) => `/packages/${s}`),
  ...slugs('src/data/experiences.ts').map((s) => `/experiences/${s}`),
  ...slugs('src/data/articles.ts').map((s) => `/guide/${s}`),
  ...packageCats.map((s) => `/packages/${s}`),
  ...expCats.map((s) => `/experiences/${s}`),
  ...stayCats.map((s) => `/stays/${s}`),
]

const today = new Date().toISOString().slice(0, 10)
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((r) => `  <url><loc>${siteUrl}${r}</loc><lastmod>${today}</lastmod><changefreq>${r === '/' ? 'daily' : 'weekly'}</changefreq><priority>${r === '/' ? '1.0' : r.split('/').length === 2 ? '0.8' : '0.7'}</priority></url>`).join('\n') +
  `\n</urlset>\n`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${routes.length} URLs → ${siteUrl}/sitemap.xml`)
