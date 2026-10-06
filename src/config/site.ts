// Central brand + environment configuration.
// Client handover: update values here (or via .env) — never scatter them in pages.
// Env vars (Vite, public-safe only — never put secrets here):
//   VITE_SITE_URL, VITE_WHATSAPP_NUMBER, VITE_CONTACT_EMAIL, VITE_ANALYTICS_ID

const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env ?? {}

export const site = {
  name: 'IslandGo Maldives',
  shortName: 'IslandGo',
  tagline: 'Discover the sunny side of the Maldives',
  description:
    'IslandGo Maldives is a Malé-based travel studio for destinations, resorts, local islands, experiences, packages and honest trip planning.',
  url: (env.VITE_SITE_URL || 'https://islandgo.mv').replace(/\/$/, ''),
  locale: 'en',
  lang: 'en',
  themeColor: '#0a2342',
  contact: {
    email: env.VITE_CONTACT_EMAIL || 'hello@islandgo.mv',
    whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '9607500000').replace(/\D/g, ''),
    whatsappDisplay: '+960 750-0000',
    address: 'Ferry Terminal Rd, Malé, Maldives',
    hours: 'Daily 8am–10pm Malé time (GMT+5)',
  },
  social: {
    // Only list platforms the business actually uses — empty strings are hidden.
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
    x: '',
    linkedin: '',
  },
  analyticsId: env.VITE_ANALYTICS_ID || '',
  defaultOgImage:
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
} as const

export const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${site.url}${path.startsWith('/') ? path : `/${path}`}`
