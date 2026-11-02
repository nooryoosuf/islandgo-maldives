// Modular analytics and URL tracking — provider-agnostic, consent-gated.
// Set VITE_ANALYTICS_ID (e.g. G-XXXXXXXXXX for GA4 or GTM-XXXXXXX for GTM).
// Accurately tracks every URL, route change, query parameter, and campaign UTM.

import { site } from '../config/site'
import { recordCurrentUrl, getStoredCampaign } from './urlTracker'

type EventName =
  | 'page_view'
  | 'plan_trip_click'
  | 'whatsapp_click'
  | 'contact_submit'
  | 'enquiry_submit'
  | 'cta_click'
  | 'search'
  | 'destination_view'
  | 'property_view'
  | 'package_view'
  | 'experience_view'
  | 'article_view'

const CONSENT_KEY = 'ig-consent'

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

export function setConsent(v: 'accepted' | 'declined') {
  try {
    localStorage.setItem(CONSENT_KEY, v)
    if (v === 'accepted') {
      initAnalytics()
      trackPageView(window.location.pathname + window.location.search)
    }
  } catch {
    /* private mode */
  }
}

export function getConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

let initialized = false

export function initAnalytics() {
  if (initialized || typeof window === 'undefined' || !site.analyticsId) return
  if (!hasConsent()) return

  const id = site.analyticsId.trim()
  if (!id) return

  try {
    // GA4 (Measurement ID starting with G-)
    if (id.startsWith('G-')) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
      document.head.appendChild(script)

      const win = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
      win.dataLayer = win.dataLayer || []
      function gtag(...args: unknown[]) {
        win.dataLayer.push(args)
      }
      win.gtag = gtag
      gtag('js', new Date())
      gtag('config', id, { send_page_view: false })
      initialized = true
    } else if (id.startsWith('GTM-')) {
      // Google Tag Manager
      const win = window as unknown as { dataLayer: unknown[] }
      win.dataLayer = win.dataLayer || []
      win.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
      document.head.appendChild(script)
      initialized = true
    }
  } catch (err) {
    console.warn('[analytics] initialization error', err)
  }
}

export function track(event: EventName, data?: Record<string, string>) {
  // Always record campaign params from URL even before explicit consent
  recordCurrentUrl()

  const campaign = getStoredCampaign()
  const payload = {
    event,
    ...campaign,
    ...data,
    url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
  }

  if (!hasConsent()) return

  if (!initialized && site.analyticsId) {
    initAnalytics()
  }

  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, payload)
  }

  try {
    const win = window as unknown as {
      dataLayer?: unknown[]
      gtag?: (...args: unknown[]) => void
      plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void
    }

    if (win.gtag && site.analyticsId?.startsWith('G-')) {
      win.gtag('event', event, payload)
    } else if (win.dataLayer) {
      win.dataLayer.push(payload)
    }

    if (win.plausible) {
      win.plausible(event, { props: payload })
    }
  } catch {
    /* never break UI for analytics */
  }
}

export function trackPageView(fullPath: string) {
  recordCurrentUrl()
  const campaign = getStoredCampaign()

  const fullUrl = typeof window !== 'undefined' ? window.location.href : fullPath
  const path = fullPath || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')

  if (!hasConsent()) return

  if (!initialized && site.analyticsId) {
    initAnalytics()
  }

  try {
    const win = window as unknown as {
      dataLayer?: unknown[]
      gtag?: (...args: unknown[]) => void
    }

    if (win.gtag && site.analyticsId?.startsWith('G-')) {
      win.gtag('config', site.analyticsId, {
        page_path: path,
        page_location: fullUrl,
        ...campaign,
      })
    } else if (win.dataLayer) {
      win.dataLayer.push({
        event: 'page_view',
        path,
        fullUrl,
        ...campaign,
      })
    }

    if (import.meta.env.DEV) {
      console.debug('[analytics] page_view', { path, fullUrl, ...campaign })
    }
  } catch {
    /* ignore */
  }
}
