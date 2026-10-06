// i18n readiness: English-only today, but UI copy funnels through here
// so Dhivehi / other market languages can be added without hunting strings.
// Next step when needed: swap `t()` for a real loader (e.g. i18next) with
// per-locale dictionaries. No hardcoded architecture blocks that.

export const DEFAULT_LOCALE = 'en' as const
export const SUPPORTED_LOCALES = ['en'] as const // add 'dv', 'de', ... later

const strings = {
  'nav.plan': 'Plan Your Trip',
  'nav.whatsapp': 'WhatsApp',
  'cta.start': 'Start planning',
  'form.send': 'Send enquiry',
} as const

export type StringKey = keyof typeof strings

export function t(key: StringKey): string {
  return strings[key] ?? key
}
