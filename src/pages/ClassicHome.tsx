import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { img } from '../data/images'
import { track } from '../lib/analytics'

// Classic agency homepage sections (reference-mockup direction).
// Global chrome (white header + navy footer in layout.tsx) wraps this page.
// Uses real routes, real contact details and the prefill enquiry flow —
// no fake booking, no invented claims.

const SERVICES = [
  { label: 'Speedboat Transfers', interest: 'speedboat transfers', image: img.beachBoat, icon: '⛴', to: '/experiences/island-hopping-day', text: 'Fast, safe and comfortable transfers across the Maldives.' },
  { label: 'Hotels & Guesthouses', interest: 'a resort or guesthouse stay', image: img.resortPool, icon: '⌂', to: '/stays', text: 'Handpicked stays on local islands and resorts.' },
  { label: 'Tours & Excursions', interest: 'tours and excursions', image: img.turtle, icon: '🤿', to: '/experiences', text: 'Snorkelling, resort trips, island hopping and more.' },
  { label: 'Holiday Packages', interest: 'a holiday package', image: img.sandbank, icon: '🧳', to: '/packages', text: 'Complete Maldives holiday packages for every traveller.' },
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
        <div className="relative container-x pt-14 sm:pt-20 pb-40 sm:pb-48 text-white">
          <p className="text-[13px] font-bold tracking-[0.3em] text-white/80">DISCOVER PARADISE</p>
          <h1 className="font-display font-bold text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] mt-3 max-w-2xl">
            Discover the Maldives<br />with <span className="text-amber-400">IslandGo MV</span>
          </h1>
          <p className="mt-3 font-semibold text-white/90">Explore <span className="text-amber-400">•</span> Discover <span className="text-amber-400">•</span> Experience Maldives</p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ['🌴', 'Stunning Islands', 'Breathtaking destinations'],
              ['🛡', 'Safe & Reliable', 'Trusted local travel partner'],
              ['✆', 'Fast Support', 'We reply within hours'],
            ].map(([icon, t, d]) => (
              <div key={t} className="flex items-center gap-2.5">
                <span className="text-2xl" aria-hidden>{icon}</span>
                <span><span className="block font-bold text-[15px]">{t}</span><span className="block text-white/70 text-[13px]">{d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widget overlapping hero */}
      <div className="container-x relative z-10 -mt-28 sm:-mt-32">
        <ClassicWidget />
      </div>

      <ClassicServices />

      <ClassicWhy />
    </main>
  )
}

export function ClassicServices() {
  return (
    <section className="container-x py-12 sm:py-16" aria-label="Services">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <Link key={s.label} to={s.to} className="group bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="relative">
              <img src={s.image} alt={s.label} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
              <span className="absolute -bottom-5 left-5 grid place-items-center w-11 h-11 rounded-full bg-sky-100 border-4 border-white text-xl" aria-hidden>{s.icon}</span>
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
          {[
            ['💎', 'Local Expertise', 'In-depth knowledge of the Maldives'],
            ['🛡', 'Honest Prices', 'Great value, confirmed in writing'],
            ['👥', 'Easy Planning', 'Quick and simple enquiries'],
            ['🎧', 'Fast Support', 'Replies within hours'],
            ['💙', 'Real Experiences', 'Unforgettable memories'],
          ].map(([icon, t, d]) => (
            <li key={t} className="text-center sm:text-left">
              <span className="inline-grid place-items-center w-12 h-12 rounded-full bg-sky-100 text-2xl" aria-hidden>{icon}</span>
              <p className="font-bold text-ink-900 text-[14.5px] mt-2.5">{t}</p>
              <p className="text-slate-500 text-[12.5px] mt-1 leading-snug">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
