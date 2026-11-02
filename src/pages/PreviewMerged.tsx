import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { properties } from '../data/properties'
import { packages } from '../data/packages'
import { experiences } from '../data/experiences'
import { articles } from '../data/articles'
import { img } from '../data/images'
import { ArticleCard, CTASection, ExperienceCard, PackageCard, SectionHeader } from '../components/ui'
import { HeroParallax, Marquee, Reveal, Spot, Words } from '../components/motion'
import { IconClock, IconShieldCheck, IconSun } from '../components/icons'
import { ClassicServices, ClassicWhy, ClassicWidget } from './ClassicHome'
import { DestTile, MiniArticle, STYLES, StayRow } from './Home'

// Fusion preview: classic agency chrome + booking widget around the
// editorial discovery sections. Preview only: noindexed, unlinked,
// excluded from sitemap.

const MARQUEE = ['Baa Atoll', 'Hanifaru Bay', 'North Malé', 'Ari Atoll', 'Thulusdhoo', 'Dhigurah', 'Maafushi', 'Lhaviyani', 'Vaavu', 'Sandbanks', 'Mantas', 'Whale sharks']

export function PreviewMerged() {
  const featDest = destinations.filter((d) => d.featured)
  const featStay = properties.filter((p) => p.featured)
  const featPack = packages.filter((p) => p.featured).slice(0, 3)

  return (
    <main className="bg-white">
      {/* Fusion hero: classic aerial composition + editorial reveal */}
      <Spot className="relative overflow-hidden bg-ocean-950">
        <div className="absolute inset-0" aria-hidden>
          <HeroParallax className="absolute inset-0">
            <img src={img.heroBeachWide} alt="" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          </HeroParallax>
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/60 via-ocean-950/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/55 via-transparent to-ocean-950/20" />
        </div>
        <div className="relative container-x pt-16 sm:pt-24 pb-40 sm:pb-52 text-white">
          <p className="hero-in text-[13px] font-bold tracking-[0.3em] text-white/80">DISCOVER PARADISE</p>
          <h1 className="font-display font-bold tracking-tight text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.0] max-w-3xl mt-3">
            <Words text="Discover the Maldives" delay={100} />
            <br />
            <span className="hero-in block text-amber-400" style={{ animationDelay: '450ms' }}>with IslandGo MV</span>
          </h1>
          <p className="hero-in mt-4 font-semibold text-white/90" style={{ animationDelay: '600ms' }}>
            Explore <span className="text-amber-400">•</span> Discover <span className="text-amber-400">•</span> Experience Maldives
          </p>
          <div className="hero-in mt-7 flex flex-wrap gap-x-8 gap-y-3" style={{ animationDelay: '750ms' }}>
            {([
              [IconSun, 'Stunning Islands', 'Breathtaking destinations'],
              [IconShieldCheck, 'Safe & Reliable', 'Trusted local travel partner'],
              [IconClock, 'Fast Support', 'We reply within hours'],
            ] as [ComponentType<{ className?: string }>, string, string][]).map(([Icon, t, d]) => (
              <div key={t} className="flex items-center gap-2.5">
                <span className="text-amber-400"><Icon className="w-7 h-7" /></span>
                <span><span className="block font-bold text-[15px]">{t}</span><span className="block text-white/70 text-[13px]">{d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </Spot>

      {/* Functional booking widget */}
      <div className="container-x relative z-10 -mt-28 sm:-mt-32">
        <Reveal>
          <ClassicWidget />
        </Reveal>
      </div>

      {/* Marquee */}
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

      {/* Destinations */}
      <section className="container-x section-pad" aria-label="Destinations">
        <SectionHeader kicker="Destinations" title="Find your island." text="Six atolls and island characters we know deeply — pick the water first, then the island." link="/destinations" />
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:auto-rows-[250px]">
          {featDest[0] && <DestTile d={featDest[0]} className="min-h-[380px] lg:min-h-0 lg:col-span-2 lg:row-span-2" />}
          {featDest[1] && <DestTile d={featDest[1]} className="min-h-[300px] lg:min-h-0" />}
          {featDest[2] && <DestTile d={featDest[2]} className="min-h-[300px] lg:min-h-0" />}
          {featDest[3] && <DestTile d={featDest[3]} wide className="min-h-[300px] lg:min-h-0 lg:col-span-3" />}
        </div>
      </section>

      <ClassicServices />

      {/* Full-width break */}
      <section className="relative overflow-hidden" aria-label="The ocean is calling">
        <img src={img.heroBeachWide} alt="Aerial view of a turquoise Maldivian lagoon" loading="lazy" decoding="async" className="w-full h-[62vh] min-h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/70 via-ocean-950/10 to-transparent" aria-hidden />
        <div className="absolute inset-0 container-x flex flex-col justify-end pb-12 sm:pb-16 text-white">
          <Reveal>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-sunset-300">Somewhere out there</p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl max-w-xl leading-tight mt-2">The water is this blue right now.</h2>
            <p className="text-white/80 text-[15.5px] mt-2 max-w-md">No filters, no stock promises. Just the sunny side, managed by locals who live here.</p>
            <div className="mt-6 flex gap-3"><Link to="/plan-trip" className="btn-primary">Plan Your Trip</Link><Link to="/destinations" className="btn-white">Browse Destinations</Link></div>
          </Reveal>
        </div>
      </section>

      {/* Stays */}
      <section className="container-x section-pad" aria-label="Where to stay">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <p className="kicker mb-3">Where to stay</p>
              <h2 className="display-xl">Sleep over<br />the lagoon.</h2>
              <p className="text-slate-600 text-[16.5px] mt-4 leading-relaxed max-w-md">Beachfront comfort at Kaani hotels on Maafushi — infinity pools, ocean-view suites, and warm hospitality.</p>
              <Link to="/stays" className="alink mt-6 text-[15px]">View all stays <span className="arr" aria-hidden>→</span></Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            {featStay.map((p, i) => <StayRow key={p.slug} p={p} i={i} />)}
          </Reveal>
        </div>
      </section>

      {/* Travel styles */}
      <section className="bg-sand-100/50 border-y border-orange-100/70" aria-label="Travel styles">
        <div className="container-x section-pad">
          <SectionHeader kicker="Travel styles" title="How do you want your days to feel?" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {STYLES.map((s) => (
              <Link key={s.title} to={s.to} className="group relative block overflow-hidden rounded-[1.4rem] border border-slate-200/70 aspect-[4/3] img-zoom">
                <img src={s.image} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/30 to-transparent" aria-hidden />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                  <h3 className="font-display font-bold text-xl sm:text-2xl">{s.title}</h3>
                  <p className="text-white/75 text-[13px] sm:text-[14px] mt-1 line-clamp-1">{s.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClassicWhy />

      {/* Experiences */}
      <section className="container-x section-pad" aria-label="Experiences">
        <SectionHeader kicker="Experiences" title="Days you’ll remember." text="Mantas, channels, surf boats and sandbanks — the days between beach naps." link="/experiences" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {experiences.slice(0, 4).map((e) => <ExperienceCard key={e.slug} e={e} />)}
        </div>
      </section>

      {/* Packages */}
      <section className="bg-sand-50 border-y border-slate-100">
        <div className="container-x section-pad" aria-label="Packages">
          <SectionHeader kicker="Packages" title="Easy starting points." text="Fixed ideas, flexible details — every trip is tailored to your dates." link="/packages" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featPack.map((p) => <PackageCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* Editorial guide row */}
      <section className="container-x section-pad" aria-label="Travel guide">
        <SectionHeader kicker="Travel guide" title="Read before you fly." text="Honest briefings from our Malé team." link="/guide" />
        <div className="mt-6">
          {articles.slice(0, 3).map((a) => <MiniArticle key={a.slug} a={a} />)}
        </div>
      </section>

      <CTASection
        image={img.sunsetBeach}
        title="Tell us what your perfect Maldives trip looks like."
        text="Dates, budget, daydreams — we reply within hours with 2–3 honest island options and a clear price."
      />
    </main>
  )
}
