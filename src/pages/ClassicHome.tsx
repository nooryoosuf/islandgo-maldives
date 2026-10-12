import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { properties } from '../data/properties'
import { packages } from '../data/packages'
import { experiences } from '../data/experiences'
import { articles } from '../data/articles'
import { img } from '../data/images'
import { ArticleCard, CategoryCard, CTASection, DestinationCard, ExperienceCard, PackageCard, PropertyCard } from '../components/ui'
import { track } from '../lib/analytics'
import { IconAnchor, IconBed, IconClock, IconCompass, IconGem, IconHeart, IconHome, IconPack, IconShieldCheck, IconSun, IconUsers } from '../components/icons'

// Classic agency homepage sections (reference-mockup direction).
// Global chrome (white header + navy footer in layout.tsx) wraps this page.
// Uses real routes, real contact details and the prefill enquiry flow —
// no fake booking, no invented claims.

const SERVICES = [
  { label: 'Speedboat Transfers', interest: 'speedboat transfers', image: img.beachBoat, Icon: IconAnchor, to: '/experiences/island-hopping-day', text: 'Fast, safe and comfortable transfers across the Maldives.' },
  { label: 'Hotels & Guesthouses', interest: 'a resort or guesthouse stay', image: img.resortPool, Icon: IconHome, to: '/stays', text: 'Handpicked stays on local islands and resorts.' },
  { label: 'Tours & Excursions', interest: 'tours and excursions', image: img.turtle, Icon: IconCompass, to: '/experiences', text: 'Snorkelling, resort trips, island hopping and more.' },
  { label: 'Holiday Packages', interest: 'a holiday package', image: img.sandbank, Icon: IconPack, to: '/packages', text: 'Complete Maldives holiday packages for every traveller.' },
]

const ORIGINS = ['Velana International Airport (MLE)', 'Malé City', 'Hulhumalé', 'Already on an island']

export function ClassicWidget() {
  const [service, setService] = useState(SERVICES[0].label)
  const [from, setFrom] = useState(ORIGINS[0])
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [pax, setPax] = useState('2 Adults')
  const sel = (label: string, v: string, set: (s: string) => void, opts: string[]) => (
    <label className="block min-w-0">
      <span className="block text-[12px] font-bold text-slate-500 mb-1">{label}</span>
      <span className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
        <select value={v} onChange={(e) => set(e.target.value)} aria-label={label} className="bg-transparent w-full font-bold text-ink-900 text-[14.5px] outline-none">
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </span>
    </label>
  )
  const href = () => {
    const p = new URLSearchParams()
    const svc = SERVICES.find((s) => s.label === service)
    if (to) p.set('destination', to)
    p.set('interest', `${svc?.interest ?? 'a trip'} from ${from}`)
    if (date) {
      const d = new Date(`${date}T12:00:00`)
      if (!isNaN(d.getTime())) p.set('dates', d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))
    }
    const n = parseInt(pax, 10)
    if (!isNaN(n)) p.set('travellers', String(Math.min(n, 6)))
    return `/plan-trip?${p.toString()}`
  }
  return (
    <form
      className="bg-white rounded-2xl shadow-soft border border-slate-100 p-4 sm:p-5 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] lg:grid-cols-[1.1fr_1fr_1fr_0.9fr_0.8fr_auto] items-end"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Start an enquiry"
    >
      {sel('Service Type', service, setService, SERVICES.map((s) => s.label))}
      {sel('From', from, setFrom, ORIGINS)}
      <label className="block min-w-0">
        <span className="block text-[12px] font-bold text-slate-500 mb-1">To / Destination</span>
        <span className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
          <select value={to} onChange={(e) => setTo(e.target.value)} aria-label="To / Destination" className="bg-transparent w-full font-bold text-ink-900 text-[14.5px] outline-none">
            <option value="">Anywhere in the Maldives</option>
            {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
        </span>
      </label>
      <label className="block min-w-0">
        <span className="block text-[12px] font-bold text-slate-500 mb-1">Travel Date</span>
        <span className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Travel date" className="bg-transparent w-full font-bold text-ink-900 text-[14.5px] outline-none" />
        </span>
      </label>
      {sel('Passengers', pax, setPax, ['1 Adult', '2 Adults', '3 Adults', '4 Adults', '5 Adults', '6+ Adults'])}
      <Link
        to={href()}
        onClick={() => track('plan_trip_click', { from: 'classic-widget' })}
        className="btn-primary !px-8 !py-3.5 !text-[15px] whitespace-nowrap"
      >
        ⌕ Search
      </Link>
    </form>
  )
}

export function ClassicHome() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={img.heroBeachWide} alt="Aerial view of a Maldivian resort island" fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/55 via-ocean-950/10 to-transparent" aria-hidden />
        <div className="relative container-x pt-14 sm:pt-20 pb-16 sm:pb-48 text-white">
          <p className="text-[13px] font-bold tracking-[0.3em] text-white/80">DISCOVER PARADISE</p>
          <h1 className="font-display font-bold text-[clamp(2rem,8vw,4.5rem)] leading-[1.02] mt-3 max-w-2xl text-balance [overflow-wrap:break-word]">
            Discover the Maldives<br />with <span className="text-amber-400">IslandGo MV</span>
          </h1>
          <p className="mt-3 font-semibold text-white/90">Explore <span className="text-amber-400">•</span> Discover <span className="text-amber-400">•</span> Experience Maldives</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-8">
            {([
              [IconSun, 'Stunning Islands', 'Breathtaking destinations'],
              [IconShieldCheck, 'Safe & Reliable', 'Trusted local travel partner'],
              [IconClock, 'Fast Support', 'We reply within hours'],
            ] as [ComponentType<{ className?: string }>, string, string][]).map(([Icon, t, d]) => (
              <div key={t} className="flex items-center gap-2.5 min-w-0">
                <span className="text-amber-400 shrink-0"><Icon className="w-7 h-7" /></span>
                <span className="min-w-0"><span className="block font-bold text-[15px]">{t}</span><span className="block text-white/70 text-[13px]">{d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widget overlapping hero (desktop and up — mobile uses quick tiles + tab bar) */}
      <div className="container-x relative z-10 -mt-28 sm:-mt-32 hidden sm:block">
        <ClassicWidget />
      </div>

      {/* Quick tiles — mobile app-style shortcuts */}
      <section className="container-x lg:hidden pt-6" aria-label="Quick links">
        <div className="grid grid-cols-5 gap-2">
          {([
            [IconBed, 'Resorts', '/stays/resorts'],
            [IconHome, 'Guesthouses', '/stays/local-islands'],
            [IconAnchor, 'Transfers', '/experiences/island-hopping-day'],
            [IconCompass, 'Excursions', '/experiences'],
            [IconPack, 'Packages', '/packages'],
          ] as [ComponentType<{ className?: string }>, string, string][]).map(([Icon, label, to]) => (
            <Link key={label} to={to} className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white py-3 px-1 text-center min-w-0">
              <span className="text-ocean-600"><Icon className="w-6 h-6" /></span>
              <span className="text-[10px] font-bold leading-tight text-ink-900 [overflow-wrap:anywhere]">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <ClassicServices />

      <ClassicWhy />

      <ClassicSections />
    </main>
  )
}

// ---------- Classic section header ----------
function CHead({ kicker, title, accent, text, link, linkLabel }: { kicker: string; title: string; accent?: string; text?: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div className="max-w-2xl">
        <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-sky-600">{kicker}</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-900 mt-2">{title} {accent && <span className="text-amber-500">{accent}</span>}</h2>
        {text && <p className="text-slate-500 text-[15px] mt-2.5">{text}</p>}
      </div>
      {link && (
        <Link to={link} className="inline-flex items-center gap-2 font-bold text-[15px] text-ocean-700 hover:text-ocean-600">
          {linkLabel ?? 'View all'} <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-300 text-white font-bold" aria-hidden>›</span>
        </Link>
      )}
    </div>
  )
}

const STYLE_TILES = [
  { image: img.couple, title: 'Honeymoon', text: 'Private & romantic', to: '/packages/honeymoon' },
  { image: img.family, title: 'Family', text: 'Kid-friendly reefs', to: '/packages/family' },
  { image: img.dive, title: 'Diving', text: 'Thilas & channels', to: '/experiences/diving' },
  { image: img.surf, title: 'Surfing', text: 'Cokes & Chickens', to: '/experiences/surfing' },
  { image: img.villaDeck, title: 'Luxury', text: 'Space & silence', to: '/packages/luxury' },
  { image: img.islandLife, title: 'Local Islands', text: 'Culture & value', to: '/stays/local-islands' },
]

// ---------- All remaining homepage sections in classic style ----------
function ClassicSections() {
  const featDest = destinations.filter((d) => d.featured)
  const featStay = properties.filter((p) => p.featured)
  const featPack = packages.filter((p) => p.featured).slice(0, 3)
  return (
    <>
      <section className="container-x py-12 sm:py-16" aria-label="Destinations">
        <CHead kicker="Destinations" title="Find Your Island" text="Six atolls and island characters we know deeply — pick the water first, then the island." link="/destinations" />
        <div className="mrail gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featDest.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      </section>

      <section className="bg-sky-50/60 border-y border-sky-100">
        <div className="container-x py-12 sm:py-16" aria-label="Where to stay">
          <CHead kicker="Where to Stay" title="Sleep Over" accent="the Lagoon" text="Real resorts and guesthouses around North Malé — Coco Bodu Hithi to Maafushi beach hotels." link="/stays" linkLabel="All stays" />
          <div className="mrail gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featStay.map((p) => <PropertyCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16" aria-label="Travel styles">
        <CHead kicker="Travel Styles" title="How Do You" accent="Travel?" text="Pick your style — every tile leads somewhere real." />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {STYLE_TILES.map((s) => <CategoryCard key={s.title} image={s.image} title={s.title} text={s.text} to={s.to} />)}
        </div>
      </section>

      <section className="container-x pb-12 sm:pb-16" aria-label="Experiences">
        <CHead kicker="Experiences" title="Days You’ll Remember" text="Mantas, channels, surf boats and village teas — the days between beach naps." link="/experiences" linkLabel="All experiences" />
        <div className="mrail gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.slice(0, 8).map((e) => <ExperienceCard key={e.slug} e={e} />)}
        </div>
      </section>

      {/* Excursion banner */}
      <section className="container-x pb-12 sm:pb-16" aria-label="Excursions">
        <Link to="/experiences" className="group relative block overflow-hidden rounded-[1.6rem] border border-slate-200/70 min-h-[300px] sm:min-h-[340px] img-zoom">
          <img src={img.turtle} alt="Snorkeller swimming with a sea turtle" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/75 via-ocean-950/25 to-transparent" aria-hidden />
          <div className="relative p-6 sm:p-10 max-w-lg text-white flex flex-col items-start justify-center h-full min-h-[inherit]">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-white/70">Exciting</p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl leading-tight mt-1">Excursions</h2>
            <p className="text-white/80 text-[14.5px] sm:text-[16px] mt-2">Snorkelling • Island Hopping • Dolphin Cruise • Sunset Trips & More</p>
            <span className="inline-flex items-center gap-2 mt-5 rounded-full bg-white text-ink-900 font-bold text-[14.5px] sm:text-[15px] px-6 py-3 group-hover:gap-3.5 transition-all">Explore Excursions <span aria-hidden>→</span></span>
          </div>
        </Link>
      </section>

      <section className="container-x pb-12 sm:pb-16" aria-label="Packages">
        <CHead kicker="Packages" title="Easy" accent="Starting Points" text="Fixed ideas, flexible details — every trip is tailored to your dates." link="/packages" />
        <div className="mrail gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featPack.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="container-x pb-12 sm:pb-16" aria-label="For travel agents">
        <div className="rounded-[1.6rem] border border-slate-200 bg-white shadow-soft p-8 sm:p-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-sky-600">For Travel Agents</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-900 mt-2">Partner with <span className="text-amber-500">IslandGo MV</span></h2>
            <p className="text-slate-500 text-[15px] mt-2.5 max-w-xl">Maldives ground services for international agents — packages, hotels, transfers and excursions with honest net rates.</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link to="/b2b" className="btn-ocean !px-7 !py-3.5 text-center">Travel Trade / B2B</Link>
            <Link to="/plan-trip" className="btn-ghost !px-7 !py-3.5 text-center">Plan Your Trip</Link>
          </div>
        </div>
      </section>

      <section className="container-x pb-14 sm:pb-20" aria-label="Travel guide">
        <CHead kicker="Travel Guide" title="Read Before" accent="You Fly" link="/guide" />
        <div className="mrail gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </section>

      <CTASection
        image={img.sunsetBeach}
        title="Tell us what your perfect Maldives trip looks like."
        text="Dates, budget, daydreams — we reply within hours with 2–3 honest island options and a clear price."
      />
    </>
  )
}

export function ClassicServices() {
  return (
    <section className="container-x py-12 sm:py-16" aria-label="Services">
      <div className="mrail gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <Link key={s.label} to={s.to} className="group bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="relative">
              <img src={s.image} alt={s.label} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                <span className="absolute -bottom-5 left-5 grid place-items-center w-11 h-11 rounded-full bg-sky-100 border-4 border-white text-sky-700"><s.Icon className="w-5 h-5" /></span>
            </div>
            <div className="p-5 pt-7 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display font-bold text-[19px] text-ink-900">{s.label}</h2>
                <p className="text-slate-500 text-[13.5px] mt-1 leading-relaxed">{s.text}</p>
              </div>
              <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-amber-300 text-white font-bold group-hover:translate-x-1 transition-transform" aria-hidden>›</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ClassicWhy() {
  return (
    <section className="container-x pb-14 sm:pb-20" aria-label="Why choose us">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
        <div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink-900">Why Choose<br /><span className="text-amber-500">IslandGo MV?</span></h2>
          <p className="text-slate-500 text-[15px] mt-3">Your trusted local travel partner for unforgettable Maldives experiences.</p>
        </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 m-0 p-0 list-none">
            {([
              [IconGem, 'Local Expertise', 'In-depth knowledge of the Maldives'],
              [IconShieldCheck, 'Honest Prices', 'Great value, confirmed in writing'],
              [IconUsers, 'Easy Planning', 'Quick and simple enquiries'],
              [IconClock, 'Fast Support', 'Replies within hours'],
              [IconHeart, 'Real Experiences', 'Unforgettable memories'],
            ] as [ComponentType<{ className?: string }>, string, string][]).map(([Icon, t, d]) => (
              <li key={t} className="text-center sm:text-left">
                <span className="inline-grid place-items-center w-12 h-12 rounded-full bg-sky-100 text-sky-700"><Icon className="w-6 h-6" /></span>
                <p className="font-bold text-ink-900 text-[14.5px] mt-2.5">{t}</p>
                <p className="text-slate-500 text-[12.5px] mt-1 leading-snug">{d}</p>
              </li>
            ))}
          </ul>
      </div>
    </section>
  )
}
