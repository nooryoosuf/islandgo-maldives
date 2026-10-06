import { useEffect } from 'react'
import { site, absoluteUrl } from '../config/site'

export interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  publishedTime?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Per-page SEO: unique title/description/canonical/OG/Twitter. Mount once per page. */
export function SEO({ title, description, path, image, type = 'website', noindex, publishedTime }: SeoProps) {
  const url = absoluteUrl(path)
  const img = image?.startsWith('http') ? image : absoluteUrl(image ?? site.defaultOgImage)
  useEffect(() => {
    document.title = title
    document.documentElement.lang = site.lang
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertLink('canonical', url)
    // Open Graph
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:locale', 'en_US')
    if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime)
    // Twitter/X
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', img)
  }, [title, description, url, img, type, noindex, publishedTime])
  return null
}

/** JSON-LD structured data. Only real content — no fabricated ratings/prices. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(Array.isArray(data) ? data : [data])
  // Remove previous page-level schemas (keep static org schema in index.html).
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.pageSchema = 'true'
    el.textContent = json
    document.head.appendChild(el)
    return () => {
      el.remove()
    }
  }, [json])
  return null
}

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${site.url}/#org`,
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.contact.email,
  telephone: `+${site.contact.whatsappNumber}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Malé', addressCountry: 'MV' },
  areaServed: 'Maldives',
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: absoluteUrl(it.path) } : {}),
    })),
  }
}

export function touristDestinationSchema(name: string, description: string, image: string, url: string) {
  return { '@context': 'https://schema.org', '@type': 'TouristDestination', name, description, image, url, touristType: 'Leisure' }
}

export function lodgingSchema(name: string, description: string, image: string, url: string) {
  return { '@context': 'https://schema.org', '@type': 'Hotel', name, description, image, url, address: { '@type': 'PostalAddress', addressCountry: 'MV' } }
}

export function articleSchema(title: string, description: string, image: string, url: string, date: string, author: string) {
  return { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, image, url, datePublished: date, author: { '@type': 'Person', name: author } }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
