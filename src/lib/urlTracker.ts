// URL and Campaign Tracking System for IslandGo Maldives.
// Captures and preserves UTM parameters, ad click IDs, and landing URLs across SPA page views.
// Ensures that marketing URLs, ad campaigns, and referrers are never lost during navigation,
// and passes attribution to WhatsApp and enquiry submissions.

export interface CampaignData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  landing_url?: string
  referrer?: string
  timestamp?: string
}

const STORAGE_KEY = 'ig_campaign_attribution'

function safeGetStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage
    }
  } catch {
    /* private browsing fallback */
  }
  return null
}

export function getStoredCampaign(): CampaignData {
  const storage = safeGetStorage()
  if (!storage) return {}
  try {
    const raw = storage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function recordCurrentUrl(): CampaignData {
  if (typeof window === 'undefined') return {}

  const storage = safeGetStorage()
  const existing = getStoredCampaign()
  const params = new URLSearchParams(window.location.search)

  const source = params.get('utm_source') || undefined
  const medium = params.get('utm_medium') || undefined
  const campaign = params.get('utm_campaign') || undefined
  const term = params.get('utm_term') || undefined
  const content = params.get('utm_content') || undefined
  const gclid = params.get('gclid') || undefined
  const fbclid = params.get('fbclid') || undefined

  const hasNewParams = source || medium || campaign || term || content || gclid || fbclid

  const updated: CampaignData = {
    ...existing,
    landing_url: existing.landing_url || window.location.href,
    referrer: existing.referrer || (document.referrer ? document.referrer : undefined),
    timestamp: existing.timestamp || new Date().toISOString(),
  }

  if (hasNewParams) {
    if (source) updated.utm_source = source
    if (medium) updated.utm_medium = medium
    if (campaign) updated.utm_campaign = campaign
    if (term) updated.utm_term = term
    if (content) updated.utm_content = content
    if (gclid) updated.gclid = gclid
    if (fbclid) updated.fbclid = fbclid
  }

  if (storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      /* ignore */
    }
  }

  return updated
}

/** Formats campaign tracking into a concise readable string for WhatsApp or booking notes */
export function getAttributionText(): string {
  const data = getStoredCampaign()
  const parts: string[] = []
  if (data.utm_source) parts.push(`src: ${data.utm_source}`)
  if (data.utm_campaign) parts.push(`cmp: ${data.utm_campaign}`)
  if (data.utm_medium) parts.push(`med: ${data.utm_medium}`)
  return parts.length > 0 ? ` [${parts.join(' | ')}]` : ''
}
