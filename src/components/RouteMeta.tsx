import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { SEO, JsonLd, breadcrumbSchema, touristDestinationSchema, lodgingSchema, articleSchema, faqSchema } from '../lib/seo'
import { site } from '../config/site'
import { getDestination } from '../data/destinations'
import { getProperty } from '../data/properties'
import { getPackage } from '../data/packages'
import { getExperience } from '../data/experiences'
import { getArticle } from '../data/articles'
import { trackPageView } from '../lib/analytics'

const STATIC: Record<string, { title: string; desc: string }> = {
  '/': { title: 'IslandGo Maldives — Discover the Sunny Side of the Maldives', desc: 'Resorts, local islands, diving, surfing, packages and honest Malé-based trip planning. Explore destinations and plan your trip.' },
  '/destinations': { title: 'Destinations | Maldives Travel Guide | IslandGo Maldives', desc: 'Explore Maldives atolls and local islands — North Malé, Baa, Ari, local-island life and more, with honest season advice.' },
  '/stays': { title: 'Resorts, Hotels & Local Islands | IslandGo Maldives', desc: 'Overwater resorts, boutique hotels and family-run guesthouses across the Maldives. Explore, then enquire — no fake availability.' },
  '/packages': { title: 'Maldives Travel Packages | IslandGo Maldives', desc: 'Honeymoon, family, luxury, adventure and budget Maldives packages — flexible starting points tailored to your dates.' },
  '/experiences': { title: 'Maldives Experiences | IslandGo Maldives', desc: 'Diving, manta snorkelling, surfing, sandbanks, dolphin cruises, fishing and island culture with local guides.' },
  '/guide': { title: 'Maldives Travel Guide | IslandGo Maldives', desc: 'First-timer briefings, resort-vs-local-island advice, manta seasons, surf guides and packing tips from locals.' },
  '/offers': { title: 'Offers | IslandGo Maldives', desc: 'Seasonal Maldives offers and value weeks. Mention the code in your enquiry — simple, real promotions.' },
  '/about': { title: 'About Us | IslandGo Maldives', desc: 'A small Malé-based travel studio matching you to the right island at the right season. New brand, local roots, straight answers.' },
  '/contact': { title: 'Contact | IslandGo Maldives', desc: 'Talk to a human in Malé — WhatsApp fastest (+960 750-0000) or email hello@islandgo.mv. Replies within hours.' },
  '/plan-trip': { title: 'Plan Your Trip | IslandGo Maldives', desc: 'Free Maldives trip planning help — tell us dates, budget and dreams; get 2–3 honest island options with clear prices.' },
  '/search': { title: 'Search | IslandGo Maldives', desc: 'Search Maldives destinations, stays, packages, experiences and travel guides.' },
  '/privacy': { title: 'Privacy Policy (Draft) | IslandGo Maldives', desc: 'How IslandGo Maldives handles enquiries and site data. Draft placeholder — final legal copy to be confirmed.' },
  '/terms': { title: 'Terms & Conditions (Draft) | IslandGo Maldives', desc: 'Enquiry terms for IslandGo Maldives travel planning. Draft placeholder — final legal copy to be confirmed.' },
  '/cookies': { title: 'Cookie Policy | IslandGo Maldives', desc: 'How IslandGo Maldives uses cookies — essentials only, analytics only after consent.' },
}

/** Central per-route SEO + structured data + page-view tracking. */
export function RouteMeta() {
  const loc = useLocation()
  const params = useParams()
  const path = loc.pathname

  useEffect(() => {
    trackPageView(path)
  }, [path])

  // Dynamic detail routes
  if (path.startsWith('/destinations/') && params.slug) {
    const d = getDestination(params.slug)
    if (!d) return <SEO title={`Not found | ${site.name}`} description="Page not found." path={path} noindex />
    return (
      <>
        <SEO title={`${d.name} | Maldives Travel Guide | ${site.name}`} description={`${d.tagline}. ${d.description}`} path={path} image={d.heroImage} />
        <JsonLd data={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Destinations', path: '/destinations' }, { name: d.name }]), touristDestinationSchema(d.name, d.description, d.heroImage, `${site.url}${path}`)]} />
      </>
    )
  }
  if (path.startsWith('/stays/') && params.slug) {
    const p = getProperty(params.slug)
    if (!p) return <SEO title={`Not found | ${site.name}`} description="Page not found." path={path} noindex />
    return (
      <>
        <SEO title={`${p.name} | Maldives Resort & Stay | ${site.name}`} description={`${p.location}. ${p.description.slice(0, 140)}`} path={path} image={p.heroImage} />
        <JsonLd data={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Stays', path: '/stays' }, { name: p.name }]), lodgingSchema(p.name, p.description, p.heroImage, `${site.url}${path}`), faqSchema(p.faqs)]} />
      </>
    )
  }
  if (path.startsWith('/packages/') && params.slug) {
    const p = getPackage(params.slug)
    if (!p) return <SEO title={`Not found | ${site.name}`} description="Page not found." path={path} noindex />
    return (
      <>
        <SEO title={`${p.name} | Maldives Travel Package | ${site.name}`} description={`${p.duration}. ${p.description.slice(0, 150)}`} path={path} image={p.heroImage} />
        <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Packages', path: '/packages' }, { name: p.name }])} />
      </>
    )
  }
  if (path.startsWith('/experiences/') && params.slug) {
    const e = getExperience(params.slug)
    if (!e) return <SEO title={`Not found | ${site.name}`} description="Page not found." path={path} noindex />
    return (
      <>
        <SEO title={`${e.name} | Maldives Experience | ${site.name}`} description={`${e.location}. ${e.description.slice(0, 150)}`} path={path} image={e.heroImage} />
        <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Experiences', path: '/experiences' }, { name: e.name }])} />
      </>
    )
  }
  if (path.startsWith('/guide/') && params.slug) {
    const a = getArticle(params.slug)
    if (!a) return <SEO title={`Not found | ${site.name}`} description="Page not found." path={path} noindex />
    return (
      <>
        <SEO title={`${a.title} | Maldives Travel Guide | ${site.name}`} description={a.excerpt} path={path} image={a.featuredImage} type="article" />
        <JsonLd data={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Guide', path: '/guide' }, { name: a.title }]), articleSchema(a.title, a.excerpt, a.featuredImage, `${site.url}${path}`, a.date, a.author)]} />
      </>
    )
  }
  const s = STATIC[path] ?? { title: `IslandGo Maldives — ${site.tagline}`, desc: site.description }
  const noindex = path === '/plan-trip' ? false : undefined
  return (
    <>
      <SEO title={s.title} description={s.desc} path={path} noindex={noindex} />
      {path === '/' && <JsonLd data={breadcrumbSchema([{ name: 'Home' }])} />}
    </>
  )
}
