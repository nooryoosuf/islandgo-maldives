import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { destinations, getDestination } from '../data/destinations'
import { experiences, getExperience } from '../data/experiences'
import { propertiesByDestination, properties } from '../data/properties'
import { packages } from '../data/packages'
import { Breadcrumbs, CTASection, DestinationCard, ExperienceCard, Gallery, ImageHero, PackageCard, PropertyCard, SectionHeader, StickyEnquire } from '../components/ui'
import { wa } from '../lib/whatsapp'
import { resolveStayType } from '../lib/categories'
import { EnquiryForm, Faq, FilterBar } from '../components/forms'
import { EmptyState } from '../components/feedback'
import { getProperty } from '../data/properties'
import { getPackage } from '../data/packages'

// ---------- DESTINATIONS ----------
export function DestinationsList() {
  return (
    <main>
      <ImageHero image={destinations[0].heroImage} kicker="Explore · Atolls & islands" title="Destinations" text="Six places we know deeply — pick an atoll character first, then the island.">
        <Link to="/plan-trip" className="btn-primary">Plan Your Trip</Link>
      </ImageHero>
      <section className="container-x section-pad">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      </section>
      <CTASection image={destinations[2].cardImage} title="Not sure which atoll fits?" text="Tell us your month + passions and we will match you in one message." />
    </main>
  )
}

export function DestinationDetail() {
  const { slug = '' } = useParams()
  const d = getDestination(slug)
  if (!d) return <NotFound />
  const stays = propertiesByDestination(d.slug)
  const exps = d.thingsToDo.map(getExperience).filter(Boolean) as typeof experiences
  const related = destinations.filter((x) => x.slug !== d.slug).slice(0, 3)
  const relPacks = packages.filter((p) => p.destinationSlugs.includes(d.slug)).slice(0, 3)
  return (
    <main>
      <ImageHero image={d.heroImage} kicker={d.atoll} title={d.name} text={d.tagline} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Destinations', to: '/destinations' }, { label: d.name }]} /></div>
      <section className="container-x py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <h2 className="h-display text-3xl">Overview</h2>
          <p className="text-[17px] leading-relaxed text-slate-700 mt-3">{d.longIntro}</p>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {d.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-slate-200 p-5 bg-white">
                <p className="text-2xl">{h.icon}</p>
                <p className="font-bold text-ink-900 mt-2">{h.title}</p>
                <p className="text-slate-600 text-[14.5px] mt-1">{h.text}</p>
              </div>
            ))}
          </div>
          <h3 className="h-display text-2xl mt-10">Things to do here</h3>
          <div className="grid sm:grid-cols-2 gap-5 mt-4">{exps.map((e) => <ExperienceCard key={e.slug} e={e} />)}</div>
          <h3 className="h-display text-2xl mt-10">Gallery</h3>
          <div className="mt-4"><Gallery images={d.gallery} alt={d.name} /></div>
        </div>
        <aside className="space-y-5">
          <div className="card p-6">
            <p className="label">Good to know</p>
            {[['Best time', d.bestTime], ['Getting there', d.transfer], ['Ideal for', d.idealFor.join(' · ')]].map(([k, v]) => (
              <div key={k} className="py-2.5 border-b border-slate-100 last:border-0"><p className="text-[13px] font-bold uppercase tracking-wide text-slate-400">{k}</p><p className="font-semibold text-ink-900 text-[15px]">{v}</p></div>
            ))}
            <Link to={`/plan-trip?destination=${d.slug}`} className="btn-primary w-full mt-4">Enquire about {d.name}</Link>
          </div>
          <EnquiryForm context={d.name} />
        </aside>
      </section>
      {stays.length > 0 && (
        <section className="container-x pb-14">
          <SectionHeader kicker="Places to stay" title={`Stay in ${d.name}`} link="/stays" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{stays.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
        </section>
      )}
      {relPacks.length > 0 && (
        <section className="bg-sand-50 border-y border-slate-100"><div className="container-x section-pad">
          <SectionHeader kicker="Packages" title="Trips including this destination" link="/packages" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{relPacks.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        </div></section>
      )}
      <section className="container-x section-pad">
        <SectionHeader kicker="Keep exploring" title="Related destinations" link="/destinations" />
        <div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <DestinationCard key={x.slug} d={x} />)}</div>
      </section>
      <CTASection image={d.gallery[0]} title={`Plan your ${d.name} trip.`} text="Dates, budget, dreams — we reply with honest island options." />
      <StickyEnquire label={d.name} planTo={`/plan-trip?destination=${d.slug}`} waHref={wa.destination(d.name)} />
    </main>
  )
}

// ---------- STAYS ----------
export function StaysList({ preset }: { preset?: string }) {
  const [sp] = useSearchParams()
  const [q, setQ] = useState('')
  const resolved = resolveStayType(preset)
  const type = resolved?.type ?? sp.get('type') ?? ''
  const typeLabel = resolved?.label ?? (type ? type.replace('-', ' ') : '')
  const list = useMemo(() => properties.filter((p) => {
    const okT = !type || p.type === type
    const okQ = !q || (p.name + p.location + p.description).toLowerCase().includes(q.toLowerCase())
    return okT && okQ
  }), [q, type])
  return (
    <main>
      <ImageHero
        image={properties[0].heroImage}
        kicker={typeLabel ? `Stays · ${typeLabel}` : 'Stays · Resorts, hotels & guesthouses'}
        title={typeLabel ? `Maldives ${typeLabel.toLowerCase()}` : 'Where to stay'}
        text={typeLabel ? `Hand-picked ${typeLabel.toLowerCase()} across the atolls — explore, then enquire.` : 'No fake availability, no checkout pressure — explore, then enquire.'}
      >
        <Link to="/plan-trip" className="btn-primary">Ask about a stay</Link>
      </ImageHero>
      <div className="container-x pt-6"><Breadcrumbs items={typeLabel ? [{ label: 'Stays', to: '/stays' }, { label: typeLabel }] : [{ label: 'Stays' }]} /></div>
      <section className="container-x section-pad">
        <FilterBar value={q} onChange={setQ} placeholder="Search stays, islands, vibes…" options={[{ label: 'Resorts', value: 'resort' }, { label: 'Hotels', value: 'hotel' }, { label: 'Local islands', value: 'local-island' }]} />
        {type && <p className="mt-3 text-sm text-slate-500">Filtered by type: <b className="text-ink-900 capitalize">{typeLabel || type.replace('-', ' ')}</b> · <Link to="/stays" className="text-ocean-700 font-bold">clear</Link></p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {list.map((p) => <PropertyCard key={p.slug} p={p} />)}
        </div>
        {list.length === 0 && <div className="mt-8"><EmptyState title="No stays found" text="Try a different search or clear the type filter — or ask us and we'll match you manually." actionTo="/plan-trip" actionLabel="Ask us to match you" /></div>}
      </section>
      <CTASection image={properties[1].heroImage} title="Want us to match you?" text="One message with dates + budget beats an hour of tab-hopping." />
    </main>
  )
}

export function StayDetail() {
  const { slug = '' } = useParams()
  if (resolveStayType(slug)) return <StaysList preset={slug} />
  const p = getProperty(slug)
  if (!p) return <NotFound />
  const dest = getDestination(p.destinationSlug)
  const exps = p.experiences.map(getExperience).filter(Boolean) as typeof experiences
  const relPacks = packages.filter((x) => x.propertySlugs?.includes(p.slug)).slice(0, 3)
  const related = properties.filter((x) => x.slug !== p.slug && x.destinationSlug === p.destinationSlug).slice(0, 3)
  return (
    <main>
      <ImageHero image={p.heroImage} kicker={`${p.type.replace('-', ' ')} · ${p.location}`} title={p.name} text={p.rating} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Stays', to: '/stays' }, { label: p.name }]} /></div>
      <section className="container-x py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <h2 className="h-display text-3xl">Overview</h2>
          <p className="text-[17px] text-slate-700 mt-3 leading-relaxed">{p.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">{p.highlights.map((h) => <span key={h} className="chip bg-ocean-50 text-ocean-800">✓ {h}</span>)}</div>
          <h3 className="h-display text-2xl mt-10">Rooms & villas</h3>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">{p.accommodation.map((r) => <div key={r.name} className="rounded-2xl border border-slate-200 p-5"><p className="font-bold text-ink-900">{r.name}</p><p className="text-slate-600 text-[14.5px] mt-1">{r.detail}</p></div>)}</div>
          <h3 className="h-display text-2xl mt-10">Dining</h3>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">{p.dining.map((r) => <div key={r.name} className="rounded-2xl border border-slate-200 p-5"><p className="font-bold text-ink-900">{r.name}</p><p className="text-slate-600 text-[14.5px] mt-1">{r.detail}</p></div>)}</div>
          <div className="grid sm:grid-cols-2 gap-8 mt-10">
            <div><h3 className="h-display text-2xl">Transfers</h3><p className="text-slate-700 mt-2">{p.transfers}</p>
              <h3 className="h-display text-2xl mt-6">Facilities</h3><ul className="mt-2 space-y-1.5">{p.facilities.map((f) => <li key={f} className="text-slate-700 text-[15px]">· {f}</li>)}</ul></div>
            <div><h3 className="h-display text-2xl">Experiences here</h3><div className="space-y-3 mt-3">{exps.map((e) => <Link key={e.slug} to={`/experiences/${e.slug}`} className="flex gap-3 items-center rounded-2xl border border-slate-200 p-3 hover:border-ocean-300"><img src={e.cardImage} alt="" className="w-16 h-16 rounded-xl object-cover" /><span><span className="block font-bold text-ink-900 text-[15px]">{e.name}</span><span className="text-slate-500 text-[13px]">{e.priceHint}</span></span></Link>)}</div></div>
          </div>
          <h3 className="h-display text-2xl mt-10">Gallery</h3>
          <div className="mt-4"><Gallery images={p.gallery} alt={p.name} /></div>
          <h3 className="h-display text-2xl mt-10">FAQs</h3>
          <div className="mt-4"><Faq faqs={p.faqs} /></div>
        </div>
        <aside className="space-y-5">
          <div className="card p-6">
            <p className="font-display text-xl text-ink-900">{p.priceHint}</p>
            <p className="text-slate-500 text-sm">{p.rating}</p>
            {dest && <Link to={`/destinations/${dest.slug}`} className="block mt-3 text-[14px] font-bold text-ocean-700">→ {dest.name}</Link>}
            <Link to={`/plan-trip?stay=${p.slug}`} className="btn-primary w-full mt-4">Ask About This Property</Link>
            <a href={wa.stay(p.name)} className="btn-ghost w-full mt-2">WhatsApp</a>
          </div>
          <EnquiryForm context={p.name} />
        </aside>
      </section>
      {relPacks.length > 0 && <section className="bg-sand-50 border-y border-slate-100"><div className="container-x section-pad"><SectionHeader kicker="Packages" title="Trips featuring this stay" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{relPacks.map((x) => <PackageCard key={x.slug} p={x} />)}</div></div></section>}
      {related.length > 0 && <section className="container-x section-pad"><SectionHeader kicker="Nearby" title="More stays nearby" link="/stays" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <PropertyCard key={x.slug} p={x} />)}</div></section>}
      <CTASection image={p.gallery[0]} title={`Ask about ${p.name}.`} text="Real availability, real quote — within hours." />
      <StickyEnquire label={p.name} planTo={`/plan-trip?stay=${p.slug}`} waHref={wa.stay(p.name)} />
    </main>
  )
}

// ---------- SHARED 404 (branded, visual, navigable) ----------
export function NotFound() {
  return (
    <main className="container-x section-pad !pt-32 sm:!pt-36">
      <div className="relative overflow-hidden rounded-[2rem] max-w-4xl mx-auto text-center text-white">
        <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1600&auto=format&fit=crop" alt="Turquoise Maldivian lagoon from above" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ocean-950/60" aria-hidden />
        <div className="relative p-10 sm:p-16">
          <p className="chip bg-white/15 border border-white/20 backdrop-blur">404 · Off the map</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-4">Looks like you’ve drifted off course.</h1>
          <p className="text-white/80 mt-3 max-w-lg mx-auto">The island (page) you’re looking for isn’t here — but the whole sunny side of the Maldives still is.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-7">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/destinations" className="btn-white">Explore Maldives</Link>
            <Link to="/search" className="btn-ghost !bg-white/10 !text-white !border-white/30">Search the site</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
