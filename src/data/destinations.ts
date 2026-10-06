import type { Destination } from './types'
import { img } from './images'

export const destinations: Destination[] = [
  {
    slug: 'north-male-atoll',
    name: 'North Malé Atoll',
    tagline: 'Resorts, surf breaks & easy escapes near the capital',
    description:
      'The most accessible atoll — 20 minutes by speedboat or a scenic seaplane hop from Velana International Airport. Home to classic resort islands, famous surf breaks and inhabited local islands.',
    longIntro:
      'North Malé Atoll is where most first-time visitors land — literally. It packs the full Maldives postcard into one atoll: overwater villas, turquoise lagoons, the surf breaks of Thulusdhoo and Himmafushi, and local-island life on Maafushi, Huraa and Dhiffushi. Transfers are short, choice is huge, and it works for every budget.',
    atoll: 'Kaafu Atoll',
    heroImage: img.heroHome,
    cardImage: img.overwater,
    gallery: [img.overwater, img.surf, img.beachBoat, img.islandLife],
    highlights: [
      { title: 'Closest to the airport', text: 'Speedboat transfers from 20 minutes — no long domestic flights needed.', icon: '✈' },
      { title: 'Legendary surf', text: 'Chickens, Cokes & Pasta Point — world-class reef breaks May to October.', icon: '🏄' },
      { title: 'Every budget', text: 'Five-star resorts, mid-range hotels and welcoming local-island guesthouses.', icon: '☀' },
    ],
    thingsToDo: ['diving-reef', 'surf-guiding', 'sandbank-picnic', 'sunset-cruise'],
    bestTime: 'November to April for calm seas; May to October for surf',
    transfer: 'Speedboat 20–60 min, or seaplane 15 min',
    idealFor: ['First-timers', 'Surfers', 'Families', 'Short stays'],
    featured: true,
  },
  {
    slug: 'baa-atoll',
    name: 'Baa Atoll',
    tagline: 'Hanifaru Bay mantas & UNESCO biosphere magic',
    description:
      'A UNESCO Biosphere Reserve famous for Hanifaru Bay — where dozens of manta rays gather to feed. Quiet luxury resorts, pristine reefs and wild island scenery.',
    longIntro:
      'Baa Atoll feels wilder and more protected than the central atolls. Between June and November, plankton blooms draw whale sharks and huge aggregations of manta rays into Hanifaru Bay — one of the best snorkelling spectacles on earth. Outside the season it is calm, crowd-free and deeply romantic.',
    atoll: 'Baa Atoll',
    heroImage: img.turtle,
    cardImage: img.turtle,
    gallery: [img.turtle, img.dive, img.snorkel, img.sandbank],
    highlights: [
      { title: 'Hanifaru Bay', text: 'Snorkel with dozens of mantas in season — strictly protected and unforgettable.', icon: '◍' },
      { title: 'Biosphere reserve', text: 'Protected reefs, thilas and coral gardens with exceptional marine life.', icon: '🐢' },
      { title: 'Quiet luxury', text: 'Low-density resorts and private sandbanks — made for honeymoons.', icon: '♥' },
    ],
    thingsToDo: ['manta-snorkelling', 'diving-reef', 'sunset-cruise', 'island-hopping-day'],
    bestTime: 'June to November for mantas; Dec–Apr for calm, clear water',
    transfer: 'Seaplane 30 min or domestic flight + speedboat',
    idealFor: ['Honeymoon', 'Divers', 'Nature lovers', 'Luxury'],
    featured: true,
  },
  {
    slug: 'ari-atoll',
    name: 'Ari Atoll',
    tagline: 'Whale sharks, dive sites & barefoot luxury',
    description:
      'One long ribbon of islands west of Malé, known for South Ari’s year-round whale sharks and some of the country’s best dive sites.',
    longIntro:
      'Ari stretches nearly 100km north to south, with distinct characters: North Ari for classic resorts and dive pinnacles, South Ari for whale-shark safaris around Maamigili. Add local islands like Dhigurah and Dhangethi for guesthouse stays with the same big-blue access at a fraction of the price.',
    atoll: 'Alif Alif / Alif Dhaal',
    heroImage: img.dive,
    cardImage: img.dive,
    gallery: [img.dive, img.snorkel, img.beachAerial, img.cruise],
    highlights: [
      { title: 'Whale sharks', text: 'South Ari offers year-round encounters — ethical, guided, snorkel-only.', icon: '🐋' },
      { title: 'Top dive sites', text: 'Maaya Thila, Fish Head & Kudarah Thila — night dives, sharks, overhangs.', icon: '🤿' },
      { title: 'Local islands too', text: 'Dhigurah’s 14km sandbank beach rivals any resort island.', icon: '🏝' },
    ],
    thingsToDo: ['whale-shark-trip', 'diving-reef', 'sandbank-picnic', 'night-fishing'],
    bestTime: 'Year-round; whale sharks best Aug–Nov',
    transfer: 'Seaplane 25–35 min or speedboat + domestic options',
    idealFor: ['Divers', 'Adventure', 'Families', 'Budget-friendly luxury'],
    featured: true,
  },
  {
    slug: 'maafushi-local-island',
    name: 'Maafushi & Local Islands',
    tagline: 'Real Maldivian life, guesthouses & great value',
    description:
      'Inhabited islands with guesthouses, cafés, dive centres and excursion boats — the warmest way to experience Maldivian culture without resort prices.',
    longIntro:
      'Staying on a local island like Maafushi, Dhiffushi, Thulusdhoo or Dhigurah means mornings with fishermen, evenings at beach cafés, and day trips to the same sandbanks and reefs the resorts use. Alcohol-free and modest-dress on public beaches, with designated bikini beaches and excursion boats for everything else.',
    atoll: 'Kaafu & beyond',
    heroImage: img.islandLife,
    cardImage: img.islandLife,
    gallery: [img.islandLife, img.guesthouse, img.foodLocal, img.beachBoat],
    highlights: [
      { title: 'Culture first', text: 'Meet hosts, join cooking nights, visit mosques, schools and boatyards.', icon: '◐' },
      { title: 'Great value', text: 'Guesthouse stays, full-board + excursions often under resort room-only rates.', icon: '◎' },
      { title: 'Same ocean', text: 'Day trips to sandbanks, mantas, turtles and resort day-visits.', icon: '⛵' },
    ],
    thingsToDo: ['island-hopping-day', 'sandbank-picnic', 'night-fishing', 'cultural-village-tour'],
    bestTime: 'November to April for calm seas',
    transfer: 'Public ferry or speedboat 30–90 min',
    idealFor: ['Budget', 'Culture', 'Solo travellers', 'Surfers'],
    featured: true,
  },
  {
    slug: 'lhaviyani-atoll',
    name: 'Lhaviyani Atoll',
    tagline: 'Quiet northern reefs & Robinson-Crusoe resorts',
    description:
      'A short seaplane north of Malé — fewer boats, glassy lagoons and two standout house reefs. Perfect when you want to truly switch off.',
    longIntro:
      'Lhaviyani is compact, quiet and postcard-perfect. With only a handful of resorts and local islands like Naifaru and Hinnavaru, reefs feel uncrowded and beaches empty. Excellent for first divers, snorkellers and anyone craving calm.',
    atoll: 'Lhaviyani (Faadhippolhu)',
    heroImage: img.sandbank,
    cardImage: img.sandbank,
    gallery: [img.sandbank, img.snorkel, img.resortVilla, img.sunsetBeach],
    highlights: [
      { title: 'House-reef snorkelling', text: 'Step off your villa into turtles, rays and coral walls.', icon: '🐠' },
      { title: 'Real quiet', text: 'Fewer day-trip boats than the central atolls.', icon: '☾' },
      { title: 'Easy transfers', text: 'Seaplane 35 min with lagoon landing.', icon: '🛩' },
    ],
    thingsToDo: ['diving-reef', 'sandbank-picnic', 'sunset-cruise', 'private-dolphin-cruise'],
    bestTime: 'December to April',
    transfer: 'Seaplane 35 min',
    idealFor: ['Honeymoon', 'Snorkellers', 'Relaxation'],
  },
  {
    slug: 'vaavu-atoll',
    name: 'Vaavu Atoll',
    tagline: 'Shark dives, night channels & liveaboard country',
    description:
      'Small, wild and famous among divers for Fotteyo Kandu — regularly voted one of the world’s best dive sites — plus night dives with nurse sharks.',
    longIntro:
      'Vaavu is the Maldives for people who live in the water. Narrow kandus (channels) funnel nutrients and big fish; liveaboards cross here on most itineraries. Local islands Thinadhoo and Felidhoo offer simple, friendly stays close to the action.',
    atoll: 'Vaavu Atoll',
    heroImage: img.oceanWave,
    cardImage: img.oceanWave,
    gallery: [img.oceanWave, img.dive, img.fishing, img.sunsetBoat],
    highlights: [
      { title: 'Fotteyo Kandu', text: 'Caves, overhangs, eagle rays — a bucket-list dive.', icon: '⬣' },
      { title: 'Night nurse sharks', text: 'Guided, respectful night snorkels at Alimatha.', icon: '☾' },
      { title: 'Liveaboard hub', text: 'The classic central-atolls cruise route passes through.', icon: '⛴' },
    ],
    thingsToDo: ['diving-reef', 'night-fishing', 'private-dolphin-cruise', 'island-hopping-day'],
    bestTime: 'November to May for diving; channels dived year-round',
    transfer: 'Speedboat 60–90 min from Malé',
    idealFor: ['Divers', 'Adventure', 'Liveaboards'],
  },
]

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug)
