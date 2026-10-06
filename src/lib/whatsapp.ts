// One reusable WhatsApp system — no hardcoded logic scattered in pages.
import { site } from '../config/site'

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${site.contact.whatsappNumber}${text}`
}

export const wa = {
  general: () => whatsappLink(`Hi ${site.shortName}! I'd like to plan a Maldives trip.`),
  destination: (name: string) => whatsappLink(`Hi ${site.shortName}! I'm interested in ${name}. My dates are ...`),
  stay: (name: string) => whatsappLink(`Hi ${site.shortName}! I'd like to ask about ${name}. My dates are ...`),
  pkg: (name: string) => whatsappLink(`Hi ${site.shortName}! I'm interested in the ${name} package.`),
  experience: (name: string) => whatsappLink(`Hi ${site.shortName}! I'd like to book/ask about ${name}.`),
  offer: (title: string, code?: string) =>
    whatsappLink(`Hi ${site.shortName}! I'd like to use the offer "${title}"${code ? ` (code ${code})` : ''}.`),
}
