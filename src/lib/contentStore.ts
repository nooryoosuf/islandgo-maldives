// Central Content Management Store for IslandGo Maldives.
// Syncs default content with dynamic admin additions, edits, and deletions.
// Emits real-time change events so the live frontend updates instantly without page refresh.

import { useEffect, useState } from 'react'
import { site as defaultSite } from '../config/site'
import { properties as defaultProperties } from '../data/properties'
import { packages as defaultPackages } from '../data/packages'
import { destinations as defaultDestinations } from '../data/destinations'
import { experiences as defaultExperiences } from '../data/experiences'
import { articles as defaultArticles, offers as defaultOffers } from '../data/articles'
import type { Property, Package, Destination, Experience, Article, Offer } from '../data/types'

export interface HomeHeroConfig {
  kicker: string
  title: string
  accent: string
  subtitle: string
  description: string
  bgImage: string
}

export interface SiteBrandConfig {
  name: string
  shortName: string
  tagline: string
  whatsappDisplay: string
  whatsappNumber: string
  email: string
  hours: string
  address: string
  hero: HomeHeroConfig
}

export interface WebsiteData {
  brand: SiteBrandConfig
  properties: Property[]
  packages: Package[]
  destinations: Destination[]
  experiences: Experience[]
  articles: Article[]
  offers: Offer[]
}

const STORAGE_KEY = 'ig_content_store_v1'
const UPDATE_EVENT = 'ig_content_store_updated'

export const initialData: WebsiteData = {
  brand: {
    name: defaultSite.name,
    shortName: defaultSite.shortName,
    tagline: defaultSite.tagline,
    whatsappDisplay: defaultSite.contact.whatsappDisplay,
    whatsappNumber: defaultSite.contact.whatsappNumber,
    email: defaultSite.contact.email,
    hours: defaultSite.contact.hours,
    address: defaultSite.contact.address,
    hero: {
      kicker: 'DISCOVER PARADISE',
      title: 'Discover the Maldives',
      accent: 'with IslandGo MV',
      subtitle: 'Explore • Discover • Experience Maldives',
      description:
        'Your premier Maldivian getaway begins here. Experience beachfront comfort at Kaani hotels, swift speedboat transfers across crystal atolls, and unforgettable sandbank excursions curated by local travel specialists in Malé.',
      bgImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2400&auto=format&fit=crop',
    },
  },
  properties: defaultProperties,
  packages: defaultPackages,
  destinations: defaultDestinations,
  experiences: defaultExperiences,
  articles: defaultArticles,
  offers: defaultOffers,
}

export function getStoredContent(): WebsiteData {
  if (typeof window === 'undefined') return initialData
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialData
    const parsed = JSON.parse(raw) as Partial<WebsiteData>
    return {
      brand: { ...initialData.brand, ...(parsed.brand || {}), hero: { ...initialData.brand.hero, ...(parsed.brand?.hero || {}) } },
      properties: Array.isArray(parsed.properties) && parsed.properties.length > 0 ? parsed.properties : initialData.properties,
      packages: Array.isArray(parsed.packages) && parsed.packages.length > 0 ? parsed.packages : initialData.packages,
      destinations: Array.isArray(parsed.destinations) && parsed.destinations.length > 0 ? parsed.destinations : initialData.destinations,
      experiences: Array.isArray(parsed.experiences) && parsed.experiences.length > 0 ? parsed.experiences : initialData.experiences,
      articles: Array.isArray(parsed.articles) && parsed.articles.length > 0 ? parsed.articles : initialData.articles,
      offers: Array.isArray(parsed.offers) && parsed.offers.length > 0 ? parsed.offers : initialData.offers,
    }
  } catch {
    return initialData
  }
}

export function saveContent(data: WebsiteData) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event(UPDATE_EVENT))
  } catch (err) {
    console.error('Failed to save content store', err)
  }
}

export function resetContentToDefaults() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event(UPDATE_EVENT))
  } catch {
    /* ignore */
  }
}

/** Reactive hook: triggers re-render whenever admin updates content */
export function useContentStore(): WebsiteData {
  const [data, setData] = useState<WebsiteData>(() => getStoredContent())

  useEffect(() => {
    const handleUpdate = () => {
      setData(getStoredContent())
    }
    window.addEventListener(UPDATE_EVENT, handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return data
}
