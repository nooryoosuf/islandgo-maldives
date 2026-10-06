// Currency-readiness: single display currency today (USD), but every price
// render path goes through here so multi-currency can be added later.
// Do NOT implement fake conversion now — amounts are indicative "from" hints.

export const DISPLAY_CURRENCY = 'USD' as const

const formatters: Record<string, Intl.NumberFormat> = {}

export function formatCurrency(amount: number, currency: string = DISPLAY_CURRENCY) {
  if (!formatters[currency]) formatters[currency] = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 })
  return formatters[currency].format(amount)
}

// Basic sanitisation for free-text inputs before display/transport.
export function sanitizeInput(s: string, max = 500) {
  return s.replace(/[<>"'`]/g, '').trim().slice(0, max)
}

export function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
}

export function isValidPhone(v: string) {
  if (!v.trim()) return true // optional field
  return /^[+\d][\d\s\-().]{5,20}$/.test(v.trim())
}
