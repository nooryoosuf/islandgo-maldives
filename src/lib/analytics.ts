// Modular analytics — provider-agnostic, consent-gated, no invasive tracking.
// Set VITE_ANALYTICS_ID to enable. Swap this file's sender to change provider
// (Plausible/GA4/etc.) without touching pages. Respects cookie consent.

import { site } from '../config/site'

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
  } catch {
    /* private mode — ignore */
  }
}

export function getConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function track(event: EventName, data?: Record<string, string>) {
  if (!hasConsent()) return
  // Dev / no provider: log once, never throw, never block UI.
  if (!site.analyticsId) {
    if (import.meta.env.DEV) console.debug('[analytics]', event, data ?? {})
    return
  }
  // Provider hook: e.g. window.plausible?.(event, { props: data })
  // or dataLayer.push — intentionally minimal until a provider is chosen.
  try {
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event, ...data })
  } catch {
    /* never break the site for analytics */
  }
}

export function trackPageView(path: string) {
  track('page_view', { path })
}
