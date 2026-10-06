// Clean category URLs (no query strings in navigation).
//   /packages/honeymoon   /experiences/diving   /stays/resorts
// Detail routes check these FIRST — no package/experience/stay slug collides
// with a category slug, so resolution is deterministic. Old ?cat=/?q=/?type=
// links keep working as a fallback (list pages still read search params).

export const PACKAGE_CATS = [
  { slug: 'honeymoon', label: 'Honeymoon' },
  { slug: 'family', label: 'Family' },
  { slug: 'luxury', label: 'Luxury' },
  { slug: 'adventure', label: 'Adventure' },
  { slug: 'budget', label: 'Budget' },
  { slug: 'island-hopping', label: 'Island hopping' },
  { slug: 'diving', label: 'Diving' },
  { slug: 'surfing', label: 'Surfing' },
] as const

export const isPackageCat = (s: string) =>
  (PACKAGE_CATS as readonly { slug: string }[]).some((c) => c.slug === s)

export const packageCatLabel = (s: string) =>
  (PACKAGE_CATS as readonly { slug: string; label: string }[]).find((c) => c.slug === s)?.label ?? s

export const EXP_CATS = [
  { slug: 'diving', label: 'Diving' },
  { slug: 'snorkelling', label: 'Snorkelling' },
  { slug: 'surfing', label: 'Surfing' },
  { slug: 'island-trips', label: 'Island trips' },
  { slug: 'cruises', label: 'Cruises' },
  { slug: 'fishing', label: 'Fishing' },
  { slug: 'culture', label: 'Culture' },
] as const

export const expCatSlug = (category: string) => category.toLowerCase().replace(/\s+/g, '-')

export const isExpCat = (s: string) =>
  (EXP_CATS as readonly { slug: string }[]).some((c) => c.slug === s)

export const expCatLabel = (s: string) =>
  (EXP_CATS as readonly { slug: string; label: string }[]).find((c) => c.slug === s)?.label ?? s

export const STAY_TYPE_URLS = [
  { slug: 'resorts', label: 'Resorts', type: 'resort' },
  { slug: 'hotels', label: 'Hotels', type: 'hotel' },
  { slug: 'local-islands', label: 'Local islands', type: 'local-island' },
  // Bare aliases redirect-equivalents (same pages, kept for robustness).
  { slug: 'resort', label: 'Resorts', type: 'resort' },
  { slug: 'hotel', label: 'Hotels', type: 'hotel' },
  { slug: 'local-island', label: 'Local islands', type: 'local-island' },
] as const

export const resolveStayType = (s: string | undefined) =>
  (STAY_TYPE_URLS as readonly { slug: string; label: string; type: string }[]).find((c) => c.slug === s)
