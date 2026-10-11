import type { Property } from './types'
import { img } from './images'

// Real resorts & guesthouses around North Malé Atoll.
// Rates are indicative starting prices ("from") — always confirmed in writing
// at enquiry time. No invented review scores are shown.

export const properties: Property[] = [
  {
    slug: 'coco-bodu-hithi',
    name: 'Coco Bodu Hithi',
    type: 'resort',
    destinationSlug: 'north-male-atoll',
    location: 'North Malé Atoll · 40 min by speedboat',
    rating: '5-star resort',
    priceHint: 'From $850 / night',
    description:
      'A five-star island resort in North Malé Atoll, known for its overwater villas — several with private plunge pools — a calm lagoon-side beach, and one of the atoll’s most relaxed dining scenes.',
    highlights: ['Overwater villas, several with private plunge pools', 'House reef with turtles minutes from the beach', 'PADI dive centre + watersports', 'Spa, gym, kids club and multiple restaurants'],
    accommodation: [
      { name: 'Beach Villa with Garden', detail: 'Shaded garden terrace · steps to the beach · from $850' },
      { name: 'Overwater Villa', detail: 'Direct lagoon access · sunset views · from $1,100' },
      { name: 'Coco Residence', detail: 'Two bedrooms · private pool · dedicated service · from $2,400' },
    ],
    dining: [
      { name: 'Island restaurants', detail: 'Maldivian, Asian and grill restaurants plus beach and overwater bars' },
      { name: 'Private dining', detail: 'Sandbank picnics and beach dinners arranged on request' },
    ],
    experiences: ['diving-reef', 'sunset-cruise', 'sandbank-picnic', 'private-dolphin-cruise'],
    transfers: 'Speedboat approx. 40 min from Velana Airport, matched to international arrivals.',
    facilities: ['House reef', 'Overwater & beach spa', 'Dive & watersports centre', 'Kids club', 'Gym', 'Restaurants + bars', 'Free Wi-Fi'],
    heroImage: img.resortVilla,
    cardImage: img.resortVilla,
    gallery: [img.resortVilla, img.overwater, img.dining, img.spa],
    faqs: [
      { q: 'Is there a house reef?', a: 'Yes — a sheltered house reef with turtles sits a short swim off the beach, plus guided dives to nearby thilas.' },
      { q: 'How do we get there?', a: 'Shared or private speedboat (approx. 40 min). We match transfers to your flights and confirm times in writing.' },
    ],
    featured: true,
  },
  {
    slug: 'kurumba-maldives',
    name: 'Kurumba Maldives',
    type: 'resort',
    destinationSlug: 'north-male-atoll',
    location: 'North Malé Atoll · 10 min by speedboat',
    rating: '5-star resort',
    priceHint: 'From $450 / night',
    description:
      'The Maldives’ first resort island, ten minutes by speedboat from the airport. Lush gardens, a gentle house reef and a famous spread of restaurants and bars make it a favourite for families and first-timers.',
    highlights: ['Closest resort island to the airport', 'Wide restaurant & bar choice across the island', 'Calm house reef, ideal for first snorkels', 'Kids club + family villas'],
    accommodation: [
      { name: 'Superior Room', detail: 'Garden setting · 5 min walk to beach · from $450' },
      { name: 'Beach Villa', detail: 'Beachfront terrace · outdoor shower · from $620' },
      { name: 'Two-Bedroom Family Residence', detail: 'Two rooms · private garden · from $1,100' },
    ],
    dining: [
      { name: 'Island restaurants & bars', detail: 'A broad choice of international restaurants, cafés and sunset bars' },
      { name: 'Cultural evenings', detail: 'Maldivian buffet nights with bodu beru drummers' },
    ],
    experiences: ['diving-reef', 'sunset-cruise', 'sandbank-picnic', 'night-fishing'],
    transfers: 'Speedboat approx. 10 min from Velana Airport, running through the day.',
    facilities: ['House reef', 'Dive school', 'Kids club', 'Spa', 'Tennis & gym', 'Free Wi-Fi'],
    heroImage: img.poolResort,
    cardImage: img.poolResort,
    gallery: [img.poolResort, img.resortPool, img.dining, img.beachAerial],
    faqs: [
      { q: 'Good for a short stay?', a: 'Excellent — the 10-minute transfer means even 3–4 night stays work well.' },
      { q: 'Is it family-friendly?', a: 'Very — shallow beach areas, kids club and interconnecting family rooms.' },
    ],
    featured: true,
  },
  {
    slug: 'bandos-maldives',
    name: 'Bandos Maldives',
    type: 'resort',
    destinationSlug: 'north-male-atoll',
    location: 'North Malé Atoll · 20 min by speedboat',
    rating: '4-star resort',
    priceHint: 'From $350 / night',
    description:
      'A long-established four-star island popular with divers and families. An on-island PADI dive centre, lively house reef and straightforward beach villas keep it honest value close to Malé.',
    highlights: ['On-island PADI dive centre', 'House reef with sharks, rays and turtles', 'Kids club + family rooms', '20 minutes from the airport'],
    accommodation: [
      { name: 'Standard Beach Room', detail: 'Garden or beachside · from $350' },
      { name: 'Beach Villa with Jacuzzi', detail: 'Beachfront · outdoor jacuzzi · from $520' },
    ],
    dining: [
      { name: 'Island restaurants', detail: 'Buffet and à la carte restaurants plus beach bars' },
      { name: 'Dive-boat lunches', detail: 'Packed lunches for full-day dive trips' },
    ],
    experiences: ['diving-reef', 'sandbank-picnic', 'night-fishing', 'sunset-cruise'],
    transfers: 'Speedboat approx. 20 min from Velana Airport.',
    facilities: ['House reef', 'PADI dive centre', 'Kids club', 'Spa', 'Watersports', 'Free Wi-Fi'],
    heroImage: img.resortPool,
    cardImage: img.resortPool,
    gallery: [img.resortPool, img.dive, img.room, img.dining],
    faqs: [
      { q: 'Good for learning to dive?', a: 'Yes — the lagoon is used for training dives and the centre runs beginner courses daily.' },
    ],
  },
  {
    slug: 'hudhuran-fushi',
    name: 'Adaaran Select Hudhuran Fushi',
    type: 'resort',
    destinationSlug: 'north-male-atoll',
    location: 'North Malé Atoll · 30 min by speedboat',
    rating: '4-star resort',
    priceHint: 'From $300 / night',
    description:
      'A premium all-inclusive island in North Malé Atoll, famous among surfers for Lohis — one of the Maldives’ best-known left-hand breaks, peeling right off the island. Easy days for non-surfers too, with a long beach and warm lagoon.',
    highlights: ['Lohis surf break on the doorstep', 'Premium all-inclusive dining & drinks', 'Long white beach + shallow lagoon', 'Surf school and board hire on island'],
    accommodation: [
      { name: 'Beach Villa', detail: 'Beachfront · garden bathroom · from $300' },
      { name: 'Ocean Villa', detail: 'Overwater · lagoon steps · from $480' },
    ],
    dining: [
      { name: 'All-inclusive restaurants', detail: 'Buffet and themed restaurants plus bars included in premium packages' },
      { name: 'Beach barbecue nights', detail: 'Weekly seafood grills on the sand' },
    ],
    experiences: ['surf-guiding', 'diving-reef', 'sandbank-picnic', 'sunset-cruise'],
    transfers: 'Speedboat approx. 30 min from Velana Airport.',
    facilities: ['Lohis surf break', 'Surf school', 'Dive centre', 'Spa', 'Kids club', 'Free Wi-Fi'],
    heroImage: img.surf,
    cardImage: img.surf,
    gallery: [img.surf, img.beachAerial, img.foodLocal, img.room],
    faqs: [
      { q: 'Best surf season?', a: 'May to October for consistent swell at Lohis; non-surfers love the calm Nov–Apr season.' },
      { q: 'Is everything really included?', a: 'Premium all-inclusive covers meals, selected drinks and many activities — we confirm exact inclusions per date in writing.' },
    ],
  },
  {
    slug: 'arena-beach-maafushi',
    name: 'Arena Beach Hotel',
    type: 'hotel',
    destinationSlug: 'maafushi-local-island',
    location: 'Maafushi · on Bikini Beach',
    rating: 'Beach hotel · Bikini Beach',
    priceHint: 'From $150 / night',
    description:
      'A well-known beach hotel on Maafushi’s Bikini Beach, run by a Maldivian team with its own dive centre. Rooftop sunsets, excursion boats daily and an easy walk to cafés and the harbour.',
    highlights: ['Directly on Bikini Beach', 'On-site PADI dive centre', 'Daily sandbank & snorkel excursions', 'Rooftop terrace + restaurant'],
    accommodation: [
      { name: 'Deluxe Sea-View Room', detail: 'Balcony facing the lagoon · from $150' },
      { name: 'Family Room', detail: 'Two connecting rooms · from $230' },
    ],
    dining: [{ name: 'Beach restaurant & rooftop', detail: 'Maldivian and international dishes, reef fish on request' }],
    experiences: ['sandbank-picnic', 'island-hopping-day', 'diving-reef', 'sunset-cruise'],
    transfers: 'Speedboat 30–45 min from Malé, pickups matched to flights.',
    facilities: ['Bikini Beach access', 'Dive centre', 'Excursion desk', 'Rooftop', 'Free Wi-Fi'],
    heroImage: img.beachAerial,
    cardImage: img.beachAerial,
    gallery: [img.beachAerial, img.dive, img.foodLocal, img.room],
    faqs: [
      { q: 'Is alcohol available?', a: 'Maafushi is a dry island — no alcohol on land. Resort day-visits with bars can be arranged.' },
      { q: 'Good for first-timers?', a: 'Perfect — affordable, social, and day trips reach the same sandbanks and reefs as the resorts.' },
    ],
    featured: true,
  },
  {
    slug: 'kaani-palm-beach',
    name: 'Kaani Palm Beach',
    type: 'hotel',
    destinationSlug: 'maafushi-local-island',
    location: 'Maafushi · near Bikini Beach',
    rating: 'Beach hotel · family-run',
    priceHint: 'From $120 / night',
    description:
      'A family-run beach hotel a short stroll from Bikini Beach, known for warm hosting and surf-and-snorkel excursion planning. Quiet rooms, generous breakfasts and help with everything from ferries to fishing nights.',
    highlights: ['Family-run hospitality', 'Minutes to Bikini Beach', 'Surf & snorkel trip planning', 'Quiet, great-value rooms'],
    accommodation: [{ name: 'Deluxe Double', detail: 'Garden or partial sea view · from $120' }],
    dining: [{ name: 'Hotel restaurant', detail: 'Breakfast included; Maldivian dinners on request' }],
    experiences: ['sandbank-picnic', 'island-hopping-day', 'night-fishing', 'sunset-cruise'],
    transfers: 'Speedboat 30–45 min from Malé, pickups matched to flights.',
    facilities: ['Excursion desk', 'Snorkel gear hire', 'Rooftop sitting area', 'Free Wi-Fi'],
    heroImage: img.sunsetBeach,
    cardImage: img.sunsetBeach,
    gallery: [img.sunsetBeach, img.beachBoat, img.dining, img.room],
    faqs: [{ q: 'How do excursions work?', a: 'The hotel desk runs shared boats daily — sandbanks, snorkel safaris, night fishing and resort day-passes.' }],
  },
  {
    slug: 'season-paradise',
    name: 'Season Paradise',
    type: 'hotel',
    destinationSlug: 'north-male-atoll',
    location: 'Thulusdhoo · walk to Cokes surf break',
    rating: 'Surf hotel · walk to Cokes',
    priceHint: 'From $140 / night',
    description:
      'Thulusdhoo’s surfer-favourite hotel, a short walk from world-famous Cokes and minutes by boat from Chickens and Sultans. Board racks, boat trips, photographers — and a calm garden to recover in.',
    highlights: ['Walk to Cokes surf break', 'Daily boats to Chickens, Sultans & Honkeys', 'Board hire + photo packages', 'Garden restaurant & rooftop'],
    accommodation: [
      { name: 'Surfer Double', detail: 'Board rack · garden view · from $140' },
      { name: 'Ocean-View Suite', detail: 'Terrace · partial sea view · from $220' },
    ],
    dining: [{ name: 'Garden restaurant', detail: 'All-day breakfast, poke bowls, grilled reef fish' }],
    experiences: ['surf-guiding', 'diving-reef', 'cultural-village-tour', 'sandbank-picnic'],
    transfers: 'Speedboat approx. 30 min from Malé to Thulusdhoo harbour.',
    facilities: ['Surf guiding', 'Board hire', 'Snorkel gear', 'Rooftop terrace', 'Free Wi-Fi'],
    heroImage: img.oceanWave,
    cardImage: img.oceanWave,
    gallery: [img.surf, img.islandLife, img.beachBoat, img.foodLocal],
    faqs: [{ q: 'Best surf season?', a: 'May to October for consistent swell; beginners love the calmer Feb–April whitewash.' }],
    featured: true,
  },
]

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug)
export const propertiesByDestination = (destSlug: string) => properties.filter((p) => p.destinationSlug === destSlug)
