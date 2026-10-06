// Client-side content search across the structured content system.
// This is a content-discovery search (destinations/stays/packages/
// experiences/articles) — never presented as live availability.

import { destinations } from '../data/destinations'
import { properties } from '../data/properties'
import { packages } from '../data/packages'
import { experiences } from '../data/experiences'
import { articles } from '../data/articles'

export interface SearchHit {
  kind: 'Destination' | 'Stay' | 'Package' | 'Experience' | 'Guide'
  title: string
  sub: string
  to: string
  image: string
}

const norm = (s: string) => s.toLowerCase()

export function searchContent(q: string, limit = 12): SearchHit[] {
  const query = norm(q.trim())
  if (query.length < 2) return []
  const hits: { hit: SearchHit; score: number }[] = []
  const push = (hit: SearchHit, hay: string, score: number) => {
    const h = norm(hay)
    if (!h.includes(query)) return
    // Prefer prefix / title matches.
    const bonus = norm(hit.title).startsWith(query) ? 3 : norm(hit.title).includes(query) ? 1 : 0
    hits.push({ hit, score: score + bonus })
  }
  destinations.forEach((d) => push({ kind: 'Destination', title: d.name, sub: d.tagline, to: `/destinations/${d.slug}`, image: d.cardImage }, `${d.name} ${d.tagline} ${d.atoll}`, 5))
  properties.forEach((p) => push({ kind: 'Stay', title: p.name, sub: p.location, to: `/stays/${p.slug}`, image: p.cardImage }, `${p.name} ${p.location} ${p.type}`, 4))
  packages.forEach((p) => push({ kind: 'Package', title: p.name, sub: p.duration, to: `/packages/${p.slug}`, image: p.cardImage }, `${p.name} ${p.category.join(' ')}`, 4))
  experiences.forEach((e) => push({ kind: 'Experience', title: e.name, sub: e.category, to: `/experiences/${e.slug}`, image: e.cardImage }, `${e.name} ${e.category}`, 3))
  articles.forEach((a) => push({ kind: 'Guide', title: a.title, sub: a.category, to: `/guide/${a.slug}`, image: a.cardImage }, `${a.title} ${a.category}`, 2))
  return hits.sort((a, b) => b.score - a.score).slice(0, limit).map((h) => h.hit)
}
