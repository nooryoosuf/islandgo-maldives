import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { properties } from '../data/properties'
import { packages } from '../data/packages'
import { experiences } from '../data/experiences'
import { articles } from '../data/articles'
import { img } from '../data/images'
import type { Article, Destination } from '../data/types'
import { ArticleCard, CTASection, ExperienceCard, PackageCard, SectionHeader } from '../components/ui'
import { HeroParallax, Magnetic, Marquee, Reveal, Spot, Words, prefersReduced } from '../components/motion'
import { track } from '../lib/analytics'

// ---------- Destination tile (image overlay + zoom on hover) ----------
function DestTile({ d, className = '', wide }: { d: Destination; className?: string; wide?: boolean }) {
  return (
    <Link
      to={`/destinations/${d.slug}`}
      className={`group relative block overflow-hidden rounded-[1.4rem] border border-slate-200/70 img-zoom ${className}`}
    >
      <img src={d.cardImage} alt={d.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/25 to-ocean-950/5 transition-opacity duration-500" aria-hidden />
      <span className="absolute top-4 left-4 sm:top-5 sm:left-5 chip bg-white/15 text-white border border-white/25 backdrop-blur !text-[12px] font-bold uppercase tracking-[0.12em]">{d.atoll}</span>
      <div className={`absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white ${wide ? 'sm:flex sm:items-end sm:justify-between sm:gap-6' : ''}`}>
        <div>
          <h3 className={`font-display leading-tight ${wide ? 'text-3xl sm:text-4xl' : 'text-[26px] sm:text-3xl'}`}>{d.name}</h3>
          <p className="text-white/75 text-[14.5px] sm:text-[15.5px] mt-1.5 max-w-md">{d.tagline}</p>
        </div>
        <span className="alink alink-light mt-3 sm:mt-4 text-[15px] shrink-0">
          Explore <span className="arr" aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}

// ---------- Stay row (editorial index list, not a card grid) ----------
function StayRow({ p, i }: { p: (typeof properties)[number]; i: number }) {
  return (
    <Link to={`/stays/${p.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6 border-t border-slate-200 last:border-b">
      <span className="font-display text-xl sm:text-2xl text-slate-300 w-8" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
      <span className="flex items-center gap-4 sm:gap-5 min-w-0">
        <span className="img-zoom block w-24 h-24 sm:w-36 sm:h-24 rounded-2xl overflow-hidden border border-slate-200/70 shrink-0">
          <img src={p.cardImage} alt="" aria-hidden loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-500 truncate">{p.location}</span>
          <span className="block font-display text-[20px] sm:text-[24px] leading-tight text-ink-900 group-hover:text-ocean-700 transition-colors truncate">{p.name}</span>
          <span className="block text-[13.5px] font-semibold text-slate-500 mt-0.5">{p.rating}</span>
        </span>
      </span>
      <span className="grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-300 text-ink-900 transition-all duration-300 group-hover:bg-ocean-600 group-hover:border-ocean-600 group-hover:text-white" aria-hidden>→</span>
    </Link>
  )
}

// ---------- Compact horizontal article row ----------
function MiniArticle({ a }: { a: Article }) {
  return (
    <Link to={`/guide/${a.slug}`} className="group flex gap-5 items-center py-5 border-t border-slate-200 last:border-b">
      <span className="img-zoom block w-32 h-24 sm:w-44 sm:h-28 rounded-2xl overflow-hidden border border-slate-200/70 shrink-0">
        <img src={a.cardImage} alt="" aria-hidden loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </span>
      <span className="min-w-0">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-sunset-600">{a.category}</span>
        <span className="block font-display text-[19px] sm:text-[22px] leading-snug text-ink-900 group-hover:text-ocean-700 transition-colors mt-1">{a.title}</span>
        <span className="block text-[13px] text-slate-500 mt-1.5 font-semibold">{a.readTime} · {a.date}</span>
      </span>
    </Link>
  )
}

const STYLES = [
  { image: img.couple, title: 'Honeymoon', text: 'Private decks, sunset cruises & barefoot romance.', to: '/packages/honeymoon' },
  { image: img.family, title: 'Family', text: 'Shallow reefs, kids clubs & sandbank afternoons.', to: '/packages/family' },
  { image: img.dive, title: 'Diving', text: 'Thilas, channels, mantas & night dives.', to: '/experiences/diving' },
  { image: img.surf, title: 'Surfing', text: 'Cokes, Chickens & boat-based guiding.', to: '/experiences/surfing' },
  { image: img.villaDeck, title: 'Luxury', text: 'Space, silence, seaplanes & overwater days.', to: '/packages/luxury' },
  { image: img.islandLife, title: 'Local islands', text: 'Culture, cafés & the smartest value.', to: '/stays/local-islands' },
]

const MARQUEE = ['Baa Atoll', 'Hanifaru Bay', 'North Malé', 'Ari Atoll', 'Thulusdhoo', 'Dhigurah', 'Maafushi', 'Lhaviyani', 'Vaavu', 'Sandbanks', 'Mantas', 'Whale sharks']

const SLIDES = [
  {
    image: img.heroHome,
    title: 'Your next island story starts here.',
    sub: 'Discover extraordinary islands, resorts and experiences across the Maldives — planned with a Malé-based team that answers on WhatsApp.',
  },
  {
    image: img.heroBeachWide,
    title: 'Blue mornings, barefoot days.',
    sub: 'Six atolls, overwater villas, local islands and reefs full of turtles — pick the water first, then the island.',
  },
  {
    image: img.sandbank,
    title: 'Find your island.',
    sub: 'Honeymoons, family reefs, surf boats and sandbank picnics — tell us your dates and we’ll match you.',
  },
]

export function Home() {
  const featDest = destinations.filter((d) => d.featured)
  const featStay = properties.filter((p) => p.featured)
  const featPack = packages.filter((p) => p.featured).slice(0, 3)

  // Rotating cinematic hero — high-res Maldives photography, changing text.
  const [slide, setSlide] = useState(0)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    if (prefersReduced() || !playing) return
    const t = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [playing])

  return (
    <main>
      {/* ============ HERO ============ */}
      <Spot className="relative overflow-hidden bg-ocean-950">
        <div className="absolute inset-0" aria-hidden>
          <HeroParallax className="absolute inset-0">
            {SLIDES.map((s, i) => (
              <div
                key={s.image}
                className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={s.image}
                  alt=""
                  fetchPriority={i === 0 ? 'high' : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${i === slide ? 'scale-110' : 'scale-100'}`}
                />
              </div>
            ))}
          </HeroParallax>
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/70 via-ocean-950/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 via-transparent to-ocean-950/20" />
        </div>

        <div className="relative container-x flex flex-col justify-end min-h-[94svh] pt-40 pb-32 sm:pb-36">
          <p className="hero-in inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white mb-6">
            ☀ The sunny side of the Maldives
          </p>
          <h1 className="font-display font-semibold text-white tracking-tight text-[clamp(2.75rem,7.5vw,5.75rem)] leading-[1.0] max-w-4xl">
            <Words key={slide} text={SLIDES[slide].title} delay={100} />
          </h1>
          <p key={`sub-${slide}`} className="hero-in mt-5 max-w-xl text-[17px] sm:text-lg text-white/85 leading-relaxed">
            {SLIDES[slide].sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link to="/plan-trip" onClick={() => track('plan_trip_click', { from: 'hero' })} className="btn-primary !px-7 !py-4 !text-base">
                Plan Your Trip <span className="arr" aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Link to="/destinations" className="btn-outline-light !px-7 !py-4 !text-base">
              Explore Maldives <span className="arr" aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-9 flex items-center gap-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              aria-label={playing ? 'Pause hero slideshow' : 'Play hero slideshow'}
              className="w-9 h-9 shrink-0 rounded-full border border-white/40 bg-white/10 backdrop-blur grid place-items-center text-white hover:bg-white/25 transition-colors"
            >
              <span aria-hidden className="text-[12px] leading-none">{playing ? '❚❚' : '▶'}</span>
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={`Show: ${s.title}`}
                  onClick={() => setSlide(i)}
                  className={`h-[3px] rounded-full transition-all duration-500 ${i === slide ? 'w-12 bg-white' : 'w-6 bg-white/35 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hero-in absolute bottom-32 right-8 hidden xl:flex flex-col items-center gap-3 text-white/70" style={{ animationDelay: '950ms' }} aria-hidden>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Scroll</span>
          <span className="cue-line" />
        </div>
      </Spot>

      {/* ============ TRIP DISCOVERY (overlapping panel = genuine elevation) ============ */}
      <div className="container-x relative z-10 -mt-20">
        <Reveal className="bg-white rounded-[1.6rem] border border-slate-200 shadow-soft p-4 sm:p-5 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
          <label className="rounded-2xl bg-sand-100/70 px-4 py-3 block">
            <span className="label !mb-0.5">Where to?</span>
            <select className="bg-transparent font-bold text-ink-900 outline-none w-full" defaultValue="">
              <option value="" disabled>Pick an island character</option>
              {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            </select>
          </label>
          <label className="rounded-2xl bg-sand-100/70 px-4 py-3 block">
            <span className="label !mb-0.5">Travel style</span>
            <select className="bg-transparent font-bold text-ink-900 outline-none w-full" defaultValue="Honeymoon">
              {['Honeymoon', 'Family', 'Luxury', 'Adventure', 'Budget', 'Island hopping'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="rounded-2xl bg-sand-100/70 px-4 py-3 block">
            <span className="label !mb-0.5">I want</span>
            <select className="bg-transparent font-bold text-ink-900 outline-none w-full" defaultValue="Diving">
              {['Diving', 'Snorkelling', 'Surfing', 'Relaxing', 'Culture'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <Link to="/plan-trip" className="btn-ocean !px-7 !py-4 whitespace-nowrap">Start planning <span className="arr" aria-hidden>→</span></Link>
        </Reveal>
      </div>

      {/* ============ MARQUEE ============ */}
      <div className="mt-14 sm:mt-20 border-y border-slate-200/80 py-5">
        <Marquee speed={46}>
          {MARQUEE.map((m, i) => (
            <span key={m} className="flex items-center shrink-0">
              <span className={`font-display text-2xl sm:text-3xl px-6 whitespace-nowrap ${i % 2 ? 'txt-outline' : 'text-ink-900'}`}>{m}</span>
              <span className="text-lagoon-500 text-lg" aria-hidden>✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ============ DESTINATIONS (editorial asymmetric + focus) ============ */}
      <section className="container-x section-pad" aria-label="Destinations">
        <SectionHeader kicker="Destinations" title="Find your island." text="Six atolls and island characters we know deeply — pick the water first, then the island." link="/destinations" />
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:auto-rows-[250px]">
          {featDest[0] && <DestTile d={featDest[0]} className="min-h-[380px] lg:min-h-0 lg:col-span-2 lg:row-span-2" />}
          {featDest[1] && <DestTile d={featDest[1]} className="min-h-[300px] lg:min-h-0" />}
          {featDest[2] && <DestTile d={featDest[2]} className="min-h-[300px] lg:min-h-0" />}
          {featDest[3] && <DestTile d={featDest[3]} wide className="min-h-[300px] lg:min-h-0 lg:col-span-3" />}
        </div>
      </section>

      {/* ============ FULL-WIDTH BREAK ============ */}
      <section className="relative overflow-hidden" aria-label="The ocean is calling">
        <img src={img.heroBeachWide} alt="Aerial view of a turquoise Maldivian lagoon" loading="lazy" decoding="async" className="w-full h-[62vh] min-h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/70 via-ocean-950/10 to-transparent" aria-hidden />
        <div className="absolute inset-0 container-x flex flex-col justify-end pb-12 sm:pb-16 text-white">
          <Reveal>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-sunset-300">Somewhere out there</p>
            <p className="font-display font-semibold tracking-tight text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] mt-2">THE OCEAN<br />IS CALLING.</p>
            <Link to="/destinations" className="alink alink-light mt-5 text-[16px]">Explore the Maldives <span className="arr" aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* ============ STAYS (editorial index) ============ */}
      <section className="container-x section-pad" aria-label="Where to stay">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <p className="kicker mb-3">Where to stay</p>
              <h2 className="display-xl">Sleep over<br />the lagoon.</h2>
              <p className="text-slate-600 text-[16.5px] mt-4 leading-relaxed max-w-md">Overwater icons, boutique surf lodges and family-run guesthouses. Large photography, honest words — every stay visited or vetted.</p>
              <Link to="/stays" className="alink mt-6 text-[15px]">View all stays <span className="arr" aria-hidden>→</span></Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            {featStay.map((p, i) => <StayRow key={p.slug} p={p} i={i} />)}
          </Reveal>
        </div>
      </section>

      {/* ============ TRAVEL STYLES (expanding panels) ============ */}
      <section className="bg-sand-100/50 border-y border-orange-100/70" aria-label="Travel styles">
        <div className="container-x section-pad">
          <SectionHeader kicker="Travel styles" title="How do you travel?" text="Hover to expand — every panel leads somewhere real." />
          <Reveal className="xpan gap-3 lg:h-[500px]">
            {STYLES.map((s) => (
              <Link key={s.title} to={s.to} className="group relative block overflow-hidden rounded-[1.4rem] border border-slate-200/70 img-zoom">
                <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/20 to-transparent" aria-hidden />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                  <h3 className="font-display text-[26px] lg:text-3xl whitespace-nowrap">{s.title}</h3>
                  <div className="xpan-more">
                    <p className="text-white/80 text-[14.5px] mt-1.5 max-w-[240px]">{s.text}</p>
                    <span className="alink alink-light mt-2.5 text-[14.5px]">Explore <span className="arr" aria-hidden>→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCES (discovery rail) ============ */}
      <section className="section-pad !pb-0" aria-label="Experiences">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="kicker mb-3">Experiences</p>
              <h2 className="display-xl">Days you’ll talk<br />about for years.</h2>
            </Reveal>
            <Reveal delay={100} className="shrink-0">
              <Link to="/experiences" className="alink text-[15px]">All experiences <span className="arr" aria-hidden>→</span></Link>
            </Reveal>
          </div>
        </div>
        <div className="container-x mt-9">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Featured experiences">
            {experiences.slice(0, 8).map((e) => (
              <div key={e.slug} role="listitem" className="h-[360px] sm:h-[400px]">
                <ExperienceCard e={e} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US (numbered editorial) ============ */}
      <section className="container-x pt-14 sm:pt-20" aria-label="Why IslandGo">
        <Reveal className="rounded-[2rem] bg-ocean-950 text-white p-8 sm:p-12 lg:p-16 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="kicker !text-sunset-300 mb-4">Why IslandGo</p>
            <h2 className="font-display font-semibold tracking-tight text-white text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">Small team.<br />Straight answers.</h2>
            <p className="text-white/70 mt-4 leading-relaxed max-w-sm">We are new as a brand and honest about it — which is why every recommendation has to earn your trust.</p>
            <Link to="/about" className="alink alink-light mt-6 text-[15px]">About us <span className="arr" aria-hidden>→</span></Link>
          </div>
          <ol className="m-0 p-0 list-none divide-y divide-white/10 border-t border-b border-white/10">
            {[
              ['Malé-based', 'We live here. Same ferries, same thilas, tide checks before promises.'],
              ['WhatsApp-first', 'Message a human, not a ticket queue — quotes to welcome briefing.'],
              ['Right island first', 'Atoll and season before star rating. We say so when it matters.'],
              ['No fake booking engine', 'No invented availability. Clear enquiries, real confirmations.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-5 sm:gap-7 py-5 items-baseline">
                <span className="font-display text-lg text-white/25 w-8 shrink-0" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-bold text-[17px]">{t}</p>
                  <p className="text-white/60 text-[14.5px] mt-0.5">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ============ PACKAGES ============ */}
      <section className="container-x section-pad" aria-label="Packages">
        <SectionHeader kicker="Packages" title="Easy starting points." text="Fixed ideas, flexible details — every trip is tailored to your dates." link="/packages" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featPack.map((p, i) => <Reveal key={p.slug} delay={i * 90}><PackageCard p={p} /></Reveal>)}
        </div>
      </section>

      {/* ============ GUIDE (editorial) ============ */}
      <section className="bg-sand-50/70 border-y border-slate-200/70" aria-label="Travel guide">
        <div className="container-x section-pad">
          <SectionHeader kicker="Travel guide" title="Read before you fly." link="/guide" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            <Reveal>{articles[0] && <ArticleCard a={articles[0]} large />}</Reveal>
            <Reveal delay={120}>
              {articles.slice(1, 3).map((a) => <MiniArticle key={a.slug} a={a} />)}
              <Link to="/guide" className="alink mt-6 text-[15px]">All guides & stories <span className="arr" aria-hidden>→</span></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <CTASection
        image={img.sunsetBeach}
        title="Tell us what your perfect Maldives trip looks like."
        text="Dates, budget, daydreams — we reply within hours with 2–3 honest island options and a clear price."
      />
    </main>
  )
}
