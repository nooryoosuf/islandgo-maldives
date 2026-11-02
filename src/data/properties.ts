import type { Property } from './types'
import { img } from './images'

// Kaani Hotels & Stays in the Maldives (Maafushi Island).
// Rates are indicative starting prices ("from") — confirmed in writing
// at enquiry time.

export const properties: Property[] = [
  {
    slug: 'kaani-palm-beach',
    name: 'Kaani Palm Beach',
    type: 'hotel',
    destinationSlug: 'maafushi-local-island',
    location: 'Maafushi · on Bikini Beach',
    rating: '4-star beach hotel · Bikini Beach',
    priceHint: 'From $140 / night',
    description:
      'Kaani Palm Beach is the flagship four-star luxury beach hotel on Maafushi, boasting the highest rooftop infinity pool in the Maldives. Positioned directly on Bikini Beach with coconut palm views and private sea-facing balconies, it offers an on-site spa, watersports center, and direct boat departure for sandbanks and manta excursions.',
    highlights: [
      'Iconic rooftop infinity pool overlooking turquoise lagoon',
      'Direct beachfront location on Maafushi Bikini Beach',
      'Sampa Sky Bar & restaurant with sunset views',
      'In-house dive centre & daily sandbank boat trips',
      'Sampa Spa with sauna and relaxing treatments',
    ],
    accommodation: [
      { name: 'Deluxe Double Ocean View with Balcony', detail: 'Private ocean-facing balcony · king bed · from $140' },
      { name: 'Superior Ocean View Suite', detail: 'Uninterrupted panoramic lagoon views · upper floor · from $190' },
      { name: 'Family Room with Sea View', detail: 'Spacious interconnecting setup for families · from $260' },
    ],
    dining: [
      { name: 'Palm Restaurant & Buffet', detail: 'Buffet breakfast, fresh Maldivian seafood grills, Asian and Western cuisine' },
      { name: 'Sampa Sky Bar', detail: 'Rooftop mocktail lounge with panoramic sunset and starlight views' },
    ],
    experiences: ['sandbank-picnic', 'diving-reef', 'sunset-cruise', 'night-fishing'],
    transfers: 'Speedboat approx. 30–35 min from Velana International Airport (MLE), scheduled and private options available.',
    facilities: ['Rooftop infinity pool', 'Bikini Beach access', 'Sampa Spa', 'Dive & watersports centre', 'Elevator access', 'Free high-speed Wi-Fi', '24/7 reception'],
    heroImage: img.poolResort,
    cardImage: img.poolResort,
    gallery: [img.poolResort, img.beachAerial, img.sunsetBeach, img.dining],
    faqs: [
      { q: 'Is the hotel directly on Bikini Beach?', a: 'Yes — step directly out from Kaani Palm Beach onto Maafushi’s Bikini Beach where swimsuits are welcomed.' },
      { q: 'How long is the transfer from the airport?', a: 'Just 30–35 minutes by speedboat from Velana Airport directly to Maafushi harbour, with meet & greet at arrivals.' },
      { q: 'Are excursions organized directly from the hotel?', a: 'Yes — the in-house excursion desk runs daily boat departures to sandbanks, nurse shark points, turtle reefs, and sunset dolphin safaris.' },
    ],
    featured: true,
  },
  {
    slug: 'kaani-grand-seaview',
    name: 'Kaani Grand Seaview',
    type: 'hotel',
    destinationSlug: 'maafushi-local-island',
    location: 'Maafushi · Bikini Beach beachfront',
    rating: '4-star beachfront hotel',
    priceHint: 'From $130 / night',
    description:
      'Standing proudly opposite the crystal waters of Bikini Beach, Kaani Grand Seaview features stylish contemporary rooms with large private ocean-view balconies. Guests enjoy open-air beachfront dining, the full-service Ayur Wellness Spa, fitness center, and effortless access to water excursions.',
    highlights: [
      'Prime beachfront position facing Bikini Beach',
      'Ayur Wellness Spa with signature Maldivian treatments',
      'Contemporary rooms with private glass-front balconies',
      'Fitness centre and beachside restaurant',
      'Daily excursions to shipwrecks and manta points',
    ],
    accommodation: [
      { name: 'Deluxe Double with Ocean View', detail: 'Private ocean-facing balcony · king bed · from $130' },
      { name: 'Grand Super Deluxe Seaview', detail: 'Spacious corner room with sweeping sea views · from $175' },
      { name: 'Ocean View Family Suite', detail: 'Two connected bedrooms with ocean terrace · from $250' },
    ],
    dining: [
      { name: 'Beachfront Open-Air Restaurant', detail: 'Daily international breakfast buffet, fresh reef fish and à la carte dining' },
      { name: 'Ocean Breeze Café', detail: 'Fresh tropical juices, barista coffee and light beach bites' },
    ],
    experiences: ['sandbank-picnic', 'island-hopping-day', 'diving-reef', 'sunset-cruise'],
    transfers: 'Speedboat approx. 30–35 min from Velana International Airport, matched to your flight arrival.',
    facilities: ['Ayur Wellness Spa', 'Fitness gym', 'Direct beach access', 'Excursion desk', 'Restaurant & Café', 'Free Wi-Fi', 'Room service'],
    heroImage: img.sunsetBeach,
    cardImage: img.sunsetBeach,
    gallery: [img.sunsetBeach, img.beachBoat, img.spa, img.room],
    faqs: [
      { q: 'Does Kaani Grand Seaview have sea-view balconies?', a: 'Yes — all ocean-view room tiers feature private outdoor balconies facing the lagoon.' },
      { q: 'Is there a spa in the hotel?', a: 'Yes — Ayur Wellness Spa offers massages, body scrubs, facials, and reflexology treatments.' },
    ],
    featured: true,
  },
  {
    slug: 'kaani-beach-hotel',
    name: 'Kaani Beach Hotel',
    type: 'hotel',
    destinationSlug: 'maafushi-local-island',
    location: 'Maafushi · Beachfront',
    rating: 'Beach hotel · Bikini Beach',
    priceHint: 'From $110 / night',
    description:
      'The original and beloved Kaani property on Maafushi, Kaani Beach Hotel is nestled amid tall coconut palms right along the beachfront. Known for its genuine Maldivian hospitality, rooftop sun terrace, relaxed open-air restaurant, and easy-going vibe.',
    highlights: [
      'Original Kaani hospitality with attentive local team',
      'Beachfront location amidst shady coconut palms',
      'Rooftop sundeck with panoramic ocean views',
      'Direct access to Bikini Beach and dive excursions',
    ],
    accommodation: [
      { name: 'Deluxe Double Sea View', detail: 'Ocean view balcony · bright tropical decor · from $110' },
      { name: 'Deluxe City View Room', detail: 'Comfortable ensuite room · quiet island side · from $95' },
    ],
    dining: [
      { name: 'Kaani Beach Restaurant', detail: 'Buffet breakfast included; Maldivian curry nights and barbecue dinners' },
    ],
    experiences: ['sandbank-picnic', 'night-fishing', 'sunset-cruise', 'cultural-village-tour'],
    transfers: 'Speedboat 30–35 min from Velana Airport directly to Maafushi harbour.',
    facilities: ['Rooftop sun terrace', 'Beachfront dining', 'Snorkel gear rental', 'Excursion desk', 'Free Wi-Fi'],
    heroImage: img.beachAerial,
    cardImage: img.beachAerial,
    gallery: [img.beachAerial, img.beachBoat, img.room, img.dining],
    faqs: [
      { q: 'Is breakfast included?', a: 'Yes — a full continental and Maldivian breakfast buffet is included with every stay.' },
      { q: 'Can we book excursions on arrival?', a: 'Yes, although we recommend pre-booking popular sandbank and nurse shark trips during peak season.' },
    ],
    featured: true,
  },
  {
    slug: 'kaani-village-spa',
    name: 'Kaani Village & Spa',
    type: 'hotel',
    destinationSlug: 'maafushi-local-island',
    location: 'Maafushi · Island Center',
    rating: 'Boutique hotel & spa',
    priceHint: 'From $105 / night',
    description:
      'A tranquil boutique retreat tucked in the heart of Maafushi, Kaani Village & Spa features an outdoor swimming pool surrounded by sun loungers and tropical foliage. Its serene garden atmosphere, Sampa Spa with sauna, and traditional Maldivian hospitality make it a peaceful oasis just two minutes from Bikini Beach.',
    highlights: [
      'Central outdoor swimming pool with sun deck',
      'Full-service Sampa Spa with private sauna & treatment rooms',
      'Peaceful village ambiance away from the bustle',
      'Short 2-minute stroll to Bikini Beach and harbour cafés',
    ],
    accommodation: [
      { name: 'Deluxe Double Pool View', detail: 'Direct view over the central swimming pool · from $105' },
      { name: 'Classic Island Room', detail: 'Comfortable double with modern en-suite · from $90' },
      { name: 'Deluxe Family Suite', detail: 'Accommodates up to 4 guests with pool views · from $180' },
    ],
    dining: [
      { name: 'Poolside Café & Restaurant', detail: 'Casual poolside breakfast, local bites, Italian pasta and evening grills' },
    ],
    experiences: ['sandbank-picnic', 'diving-reef', 'night-fishing', 'cultural-village-tour'],
    transfers: 'Speedboat 30–35 min from Velana Airport to Maafushi harbour with hotel luggage transfer.',
    facilities: ['Swimming pool', 'Sampa Spa & sauna', 'Poolside dining', 'Excursion service', 'Free Wi-Fi'],
    heroImage: img.resortPool,
    cardImage: img.resortPool,
    gallery: [img.resortPool, img.spa, img.islandLife, img.room],
    faqs: [
      { q: 'How far is Kaani Village from Bikini Beach?', a: 'A quick and easy 2-minute walk through Maafushi’s quiet island lanes.' },
      { q: 'Is the swimming pool open all year?', a: 'Yes, the central outdoor pool is open year-round for hotel guests.' },
    ],
    featured: true,
  },
]

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug)
export const propertiesByDestination = (destSlug: string) => properties.filter((p) => p.destinationSlug === destSlug)
