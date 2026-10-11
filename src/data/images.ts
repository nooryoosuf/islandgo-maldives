// Central image library. Swap these Unsplash placeholders with real
// agency photography later — components only reference these keys/URLs,
// so no redesign is needed.
//
// All URLs use images.unsplash.com (stable CDN) with consistent params.

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const img = {
  heroHome: u('photo-1514282401047-d79a71a590e8', 2400),
  heroBeachWide: u('photo-1573843981267-be1999ff37cd', 2400),
  overwater: u('photo-1570789210967-2cac24afeb00'),
  resortPool: u('photo-1520250497591-112f2f40a3f4'),
  resortVilla: u('photo-1584132967334-10e028bd69f7'),
  beachAerial: u('photo-1507525428034-b723cf961d3e'),
  beachBoat: u('photo-1506929562872-bb421503ef21'),
  sunsetBoat: u('photo-1516690561799-46d8f74f9abf'),
  sunsetBeach: u('photo-1519046904884-53103b34b206'),
  dive: u('photo-1544551763-46a013bb70d5'),
  turtle: u('photo-1437622368342-7a3d73a34c8f'),
  surf: u('photo-1502680390469-be75c86b636f'),
  snorkel: u('photo-1559825481-12a05cc00344'),
  fishing: u('photo-1500375592092-40eb2168fd21'),
  islandLife: u('photo-1512100356356-de1b84283e18'),
  sandbank: u('photo-1540202404-a2f29016b523'),
  dining: u('photo-1414235077428-338989a2e8c0'),
  foodLocal: u('photo-1504674900247-0877df9cc836'),
  spa: u('photo-1544161515-4ab6ce6db874'),
  poolResort: u('photo-1540541338287-41700207dee6'),
  villaDeck: u('photo-1571896349842-33c89424de2d'),
  oceanWave: u('photo-1505118380757-91f5f5632de0'),
  // Maldives-tropical lifestyle imagery (replaces generic stock).
  couple: u('photo-1507525428034-b723cf961d3e'),
  family: u('photo-1505142468610-359e7d316be0'),
  cruise: u('photo-1506929562872-bb421503ef21'),
  guesthouse: u('photo-1512100356356-de1b84283e18'),
  room: u('photo-1590490360182-c33d57733427'),
  maleCity: u('photo-1506929562872-bb421503ef21'),
}

export const FALLBACK = img.heroHome
