// Structured content models — adding a new item here automatically
// surfaces it in listings, related sections and homepage.

export type StayType = 'resort' | 'hotel' | 'local-island' | 'liveaboard'

export interface Destination {
  slug: string
  name: string
  tagline: string
  description: string
  longIntro: string
  atoll: string
  heroImage: string
  cardImage: string
  gallery: string[]
  highlights: { title: string; text: string; icon: string }[]
  thingsToDo: string[] // experience slugs
  bestTime: string
  transfer: string
  idealFor: string[]
  featured?: boolean
}

export interface Property {
  slug: string
  name: string
  type: StayType
  destinationSlug: string
  location: string
  rating: string
  priceHint: string
  description: string
  highlights: string[]
  accommodation: { name: string; detail: string }[]
  dining: { name: string; detail: string }[]
  experiences: string[] // experience slugs
  transfers: string
  facilities: string[]
  heroImage: string
  cardImage: string
  gallery: string[]
  faqs: { q: string; a: string }[]
  featured?: boolean
}

export type PackageCategory =
  | 'honeymoon'
  | 'family'
  | 'luxury'
  | 'adventure'
  | 'budget'
  | 'island-hopping'
  | 'diving'
  | 'surfing'

export interface Package {
  slug: string
  name: string
  category: PackageCategory[]
  destinationSlugs: string[]
  propertySlugs?: string[]
  duration: string
  nights: number
  groupSize: string
  priceHint: string
  description: string
  itinerary: { day: string; title: string; text: string }[]
  included: string[]
  notIncluded: string[]
  addOns: string[]
  heroImage: string
  cardImage: string
  gallery: string[]
  featured?: boolean
}

export interface Experience {
  slug: string
  name: string
  category: string
  location: string
  duration: string
  groupSize: string
  priceHint: string
  description: string
  whatYouGet: string[]
  details: string
  requirements: string
  heroImage: string
  cardImage: string
  gallery: string[]
  featured?: boolean
}

export interface Article {
  slug: string
  title: string
  category: string
  excerpt: string
  author: string
  date: string
  readTime: string
  featuredImage: string
  cardImage: string
  content: string[]
  relatedDestinationSlugs?: string[]
  relatedExperienceSlugs?: string[]
  featured?: boolean
}

export interface Offer {
  slug: string
  title: string
  description: string
  validUntil: string
  code?: string
  image: string
  tag: string
}
