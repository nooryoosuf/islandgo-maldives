import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumbs, CTASection, ExperienceCard, Gallery, ImageHero, PackageCard, ArticleCard, SectionHeader, DestinationCard, StickyEnquire } from '../components/ui'
import { EnquiryForm, FilterBar } from '../components/forms'
import { wa } from '../lib/whatsapp'
import { EmptyState } from '../components/feedback'
import { isPackageCat, packageCatLabel, isExpCat, expCatLabel, expCatSlug } from '../lib/categories'
import { NotFound } from './Explore'
import { useContentStore } from '../lib/contentStore'
import type { Experience } from '../data/types'

// ---------- PACKAGES ----------
export function PackagesList({ presetCat }: { presetCat?: string }) {
  const { packages } = useContentStore()
  const [sp] = useSearchParams()
  const [q, setQ] = useState('')
  const cat = presetCat ?? sp.get('cat') ?? ''
  const catLabel = cat ? packageCatLabel(cat) : ''
  const list = useMemo(() => packages.filter((p) => {
    const okC = !cat || p.category.includes(cat as never)
    const okQ = !q || (p.name + p.description).toLowerCase().includes(q.toLowerCase())
    return okC && okQ
  }), [packages, q, cat])

  return (
    <main>
      <ImageHero
        image={packages[0]?.heroImage}
        kicker={catLabel ? `Packages · ${catLabel}` : 'Packages · Flexible starting points'}
        title={catLabel ? `${catLabel} in the Maldives` : 'Packages'}
        text={catLabel ? `Hand-picked ${catLabel.toLowerCase()} trips — every itinerary is tailored to your dates.` : 'Discover Maldives holiday packages for couples, families and budget-conscious travelers. Choose your preferred experience and contact us for a personalized quotation.'}
      />
      <div className="container-x pt-6"><Breadcrumbs items={catLabel ? [{ label: 'Packages', to: '/packages' }, { label: catLabel }] : [{ label: 'Packages' }]} /></div>
      <section className="container-x section-pad">
        <FilterBar value={q} onChange={setQ} placeholder="Search honeymoon, diving, budget…" options={[{ label: 'Honeymoon', value: 'honeymoon' }, { label: 'Family', value: 'family' }, { label: 'Luxury', value: 'luxury' }, { label: 'Adventure', value: 'adventure' }, { label: 'Budget', value: 'budget' }]} />
        {cat && <p className="mt-3 text-sm text-slate-500">Filtered: <b className="text-ink-900 capitalize">{cat}</b> · <Link to="/packages" className="text-ocean-700 font-bold">clear</Link></p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">{list.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        {list.length === 0 && <div className="mt-8"><EmptyState title="No packages found" text="Try another travel style — or tell us your dates and we'll build one around you." actionTo="/plan-trip" actionLabel="Ask for a custom trip" /></div>}
      </section>
      <CTASection image={packages[1]?.cardImage || packages[0]?.cardImage} title="Want it tweaked?" text="Add nights, swap islands, upgrade the villa — quotes in hours." />
    </main>
  )
}

export function PackageDetail() {
  const { slug = '' } = useParams()
  const { packages, destinations, properties } = useContentStore()
  if (isPackageCat(slug)) return <PackagesList presetCat={slug} />
  const p = packages.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const dests = p.destinationSlugs.map((s) => destinations.find((d) => d.slug === s)).filter(Boolean)
  const stays = (p.propertySlugs ?? []).map((s) => properties.find((x) => x.slug === s)).filter(Boolean)
  const related = packages.filter((x) => x.slug !== p.slug && x.category.some((c) => p.category.includes(c))).slice(0, 3)

  return (
    <main>
      <ImageHero image={p.heroImage} kicker={`${p.duration} · ${p.groupSize}`} title={p.name} text={p.priceHint} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Packages', to: '/packages' }, { label: p.name }]} /></div>
      <section className="container-x py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <h2 className="h-display text-3xl">Overview</h2>
          <p className="text-[17px] text-slate-700 mt-3 leading-relaxed">{p.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">{p.category.map((c) => <span key={c} className="chip bg-ocean-50 text-ocean-800">#{c}</span>)}</div>
          <h3 className="h-display text-2xl mt-10">Itinerary</h3>
          <div className="relative pl-6 border-l-2 border-ocean-200 space-y-6 mt-6">
            {p.itinerary.map((it) => (
              <div key={it.day} className="relative">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-ocean-600 ring-4 ring-white" aria-hidden />
                <p className="text-[13px] font-bold uppercase tracking-wider text-ocean-700">{it.day}</p>
                <p className="font-bold text-ink-900 text-lg mt-0.5">{it.title}</p>
                <p className="text-slate-600 text-[15px] mt-1 leading-relaxed">{it.text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-8 mt-10">
            <div>
              <h3 className="h-display text-2xl text-ocean-900">What’s included</h3>
              <ul className="mt-3 space-y-2">{p.included.map((x) => <li key={x} className="flex gap-2 text-[15px] text-slate-700"><span className="text-emerald-600 font-bold">✓</span> {x}</li>)}</ul>
              {p.addOns && (
                <>
                  <h4 className="font-display text-xl mt-6">Popular add-ons</h4>
                  <ul className="mt-2 space-y-1.5">{p.addOns.map((x) => <li key={x} className="text-[14.5px] text-slate-600">+ {x}</li>)}</ul>
                </>
              )}
            </div>
            <div>
              <h3 className="h-display text-2xl text-slate-900">Not included</h3>
              <ul className="mt-3 space-y-2">{p.notIncluded.map((x) => <li key={x} className="flex gap-2 text-[15px] text-slate-500"><span>✕</span> {x}</li>)}</ul>
            </div>
          </div>
          {stays.length > 0 && (
            <div className="mt-10">
              <h3 className="h-display text-2xl">Featured accommodation</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">{stays.map((s) => s && <Link key={s.slug} to={`/stays/${s.slug}`} className="card p-4 flex gap-3 items-center"><img src={s.cardImage} alt="" className="w-16 h-16 rounded-xl object-cover" /><span><span className="block font-bold text-ink-900 text-[15px]">{s.name}</span><span className="text-slate-500 text-xs">{s.location}</span></span></Link>)}</div>
            </div>
          )}
          <h3 className="h-display text-2xl mt-10">Gallery</h3>
          <div className="mt-4"><Gallery images={p.gallery} alt={p.name} /></div>
        </div>
        <aside className="space-y-5">
          <div className="card p-6">
            <p className="font-display text-2xl text-ink-900">{p.priceHint}</p>
            <p className="text-slate-500 text-sm mt-0.5">{p.duration} · {p.groupSize}</p>
            <Link to={`/plan-trip?package=${p.slug}`} className="btn-primary w-full mt-4">Enquire with This Package</Link>
            <a href={wa.pkg(p.name)} className="btn-ghost w-full mt-2">WhatsApp</a>
          </div>
          <EnquiryForm context={p.name} />
        </aside>
      </section>
      {related.length > 0 && <section className="container-x section-pad"><SectionHeader kicker="Keep exploring" title="Similar packages" link="/packages" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <PackageCard key={x.slug} p={x} />)}</div></section>}
      <CTASection image={p.gallery[0]} title={`Tailor the ${p.name}.`} text="Tell us your dates and group size — we adjust everything." />
      <StickyEnquire label={p.name} planTo={`/plan-trip?package=${p.slug}`} waHref={wa.pkg(p.name)} />
    </main>
  )
}

function ExpRow({ e, i }: { e: Experience; i: number }) {
  return (
    <Link to={`/experiences/${e.slug}`} className="group grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6 py-5 sm:py-6 border-t border-slate-200 last:border-b">
      <span className="font-display text-xl sm:text-2xl text-slate-300 w-8 hidden sm:block" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
      <span className="flex items-center gap-3 sm:gap-5 min-w-0">
        <span className="img-zoom block w-24 h-24 sm:w-36 sm:h-24 rounded-2xl overflow-hidden border border-slate-200/70 shrink-0">
          <img src={e.cardImage} alt="" aria-hidden loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11.5px] font-bold uppercase tracking-[0.12em] text-ocean-700 truncate">{e.category} · {e.location}</span>
          <span className="block font-display text-[20px] sm:text-[23px] leading-tight text-ink-900 group-hover:text-ocean-700 transition-colors truncate">{e.name}</span>
          <span className="block text-[13px] text-slate-500 mt-1 font-semibold">{e.duration} · {e.priceHint}</span>
        </span>
      </span>
      <span className="grid place-items-center w-11 h-11 rounded-full border border-slate-300 text-ink-900 transition-all duration-300 group-hover:bg-ocean-600 group-hover:border-ocean-600 group-hover:text-white shrink-0" aria-hidden>→</span>
    </Link>
  )
}

export function ExperiencesList({ presetExp }: { presetExp?: string }) {
  const { experiences } = useContentStore()
  const [sp] = useSearchParams()
  const [q, setQ] = useState(sp.get('q') ?? '')
  const preset = isExpCat(presetExp ?? '') ? expCatLabel(presetExp as string) : ''
  const base = presetExp && isExpCat(presetExp) ? experiences.filter((e) => expCatSlug(e.category) === presetExp) : experiences
  const list = !q ? base : base.filter((e) => (e.name + e.category + e.description).toLowerCase().includes(q.toLowerCase()))
  const [featured, ...rest] = list

  return (
    <main>
      <ImageHero
        image={experiences[0]?.heroImage}
        kicker={preset ? `Experiences · ${preset}` : 'Experiences · Diving to culture'}
        title={preset ? `${preset} in the Maldives` : 'Experiences'}
        text={preset ? `Guided ${preset.toLowerCase()} with local experts — permits, boats and timing handled.` : 'Mantas, channels, surf boats and sandbanks — the days between beach naps.'}
      />
      <div className="container-x pt-6"><Breadcrumbs items={preset ? [{ label: 'Experiences', to: '/experiences' }, { label: preset }] : [{ label: 'Experiences' }]} /></div>
      <section className="container-x section-pad">
        {featured && (
          <Link to={`/experiences/${featured.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:gap-12 items-center pb-12">
            <span className="img-zoom block lg:col-span-7 rounded-[1.6rem] overflow-hidden border border-slate-200/70">
              <img src={featured.heroImage} alt={featured.name} decoding="async" className="w-full aspect-[16/9] object-cover" />
            </span>
            <span className="lg:col-span-5">
              <span className="kicker">Featured · {featured.category}</span>
              <span className="block font-display font-semibold tracking-tight text-ink-900 group-hover:text-ocean-700 transition-colors text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.08] mt-4">{featured.name}</span>
              <span className="block text-slate-600 text-[16px] leading-relaxed mt-4">{featured.description}</span>
              <span className="block text-[13.5px] font-semibold text-slate-500 mt-4">{featured.duration} · {featured.groupSize} · {featured.priceHint}</span>
              <span className="alink mt-5 text-[15px]">Discover <span className="arr" aria-hidden>→</span></span>
            </span>
          </Link>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4 pt-4">
          <h2 className="h-display text-2xl sm:text-3xl">{preset ? `All ${preset.toLowerCase()}` : 'All experiences'}</h2>
          <div className="w-full sm:w-72">
            <label htmlFor="exp-search" className="label">Search experiences</label>
            <input id="exp-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try diving, surf, sandbank…" className="input !py-2.5" />
          </div>
        </div>
        {list.length === 0 && <div className="mt-8"><EmptyState title="No experiences found" text="Try exploring another category — diving, surf, sandbanks and cruises run across all atolls." actionTo="/experiences" actionLabel="View all experiences" /></div>}
        <div className="mt-6">
          {rest.map((e, i) => <ExpRow key={e.slug} e={e} i={i} />)}
        </div>
      </section>
      <CTASection image={experiences[3]?.cardImage || experiences[0]?.cardImage} title="Bundle experiences into a day." text="Sandbank morning + dolphin sunset is our favourite combo." />
    </main>
  )
}

export function ExperienceDetail() {
  const { slug = '' } = useParams()
  const { experiences } = useContentStore()
  if (isExpCat(slug)) return <ExperiencesList presetExp={slug} />
  const e = experiences.find((x) => x.slug === slug)
  if (!e) return <NotFound />
  const related = experiences.filter((x) => x.slug !== e.slug && x.category === e.category).slice(0, 3)

  return (
    <main>
      <ImageHero image={e.heroImage} kicker={`${e.category} · ${e.location}`} title={e.name} text={e.priceHint} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Experiences', to: '/experiences' }, { label: e.name }]} /></div>
      <section className="container-x py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <h2 className="h-display text-3xl">Overview</h2>
          <p className="text-[17px] text-slate-700 mt-3 leading-relaxed">{e.description}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <div className="card p-5"><p className="text-[12.5px] uppercase tracking-wider font-bold text-slate-400">Duration</p><p className="font-bold text-ink-900 text-lg mt-1">{e.duration}</p></div>
            <div className="card p-5"><p className="text-[12.5px] uppercase tracking-wider font-bold text-slate-400">Group size</p><p className="font-bold text-ink-900 text-lg mt-1">{e.groupSize}</p></div>
          </div>
          <h3 className="h-display text-2xl mt-10">What’s included</h3>
          <ul className="mt-3 space-y-2">{e.whatYouGet.map((x) => <li key={x} className="flex gap-2 text-[15px] text-slate-700"><span className="text-emerald-600 font-bold">✓</span> {x}</li>)}</ul>
          <h3 className="h-display text-2xl mt-10">Good to know</h3>
          <p className="text-slate-700 text-[15.5px] mt-2">{e.details}</p>
          <p className="text-slate-500 text-[14px] mt-2">Requirements: {e.requirements}</p>
          <h3 className="h-display text-2xl mt-10">Gallery</h3>
          <div className="mt-4"><Gallery images={e.gallery} alt={e.name} /></div>
        </div>
        <aside className="space-y-5">
          <div className="card p-6">
            <p className="font-display text-2xl text-ink-900">{e.priceHint}</p>
            <p className="text-slate-500 text-sm mt-0.5">{e.duration}</p>
            <Link to={`/plan-trip?experience=${e.slug}`} className="btn-primary w-full mt-4">Enquire about this tour</Link>
            <a href={wa.experience(e.name)} className="btn-ghost w-full mt-2">WhatsApp</a>
          </div>
          <EnquiryForm context={e.name} />
        </aside>
      </section>
      {related.length > 0 && <section className="container-x section-pad"><SectionHeader kicker="More to try" title="Similar experiences" link="/experiences" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <ExperienceCard key={x.slug} e={x} />)}</div></section>}
      <CTASection image={e.gallery[0]} title={`Book ${e.name}.`} text="Message dates and group size — we confirm boats and guides." />
      <StickyEnquire label={e.name} planTo={`/plan-trip?experience=${e.slug}`} waHref={wa.experience(e.name)} />
    </main>
  )
}

export function GuideList() {
  const { articles } = useContentStore()
  const [q, setQ] = useState('')
  const list = !q ? articles : articles.filter((a) => (a.title + a.category + a.excerpt).toLowerCase().includes(q.toLowerCase()))

  return (
    <main>
      <ImageHero image={articles[0]?.featuredImage} kicker="Travel Guide · Local intelligence" title="Read before you fly." text="First-timer briefings, resort-vs-local-island advice, manta seasons and packing tips — straight answers from Malé locals." />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Guide' }]} /></div>
      <section className="container-x section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div><p className="kicker mb-1">Field notes</p><h2 className="display-xl">Latest briefings</h2></div>
          <div className="w-full sm:w-72">
            <label htmlFor="guide-search" className="label">Search guide</label>
            <input id="guide-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try mantas, surf, packing…" className="input !py-2.5" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        {list.length === 0 && <div className="mt-8"><EmptyState title="No articles found" text="Try another term, or message us directly with your question." actionTo="/contact" actionLabel="Ask our team" /></div>}
      </section>
      <CTASection image={articles[1]?.featuredImage || articles[0]?.featuredImage} title="Have a question not covered here?" text="Send us a quick message — our Malé team replies in plain English." />
    </main>
  )
}

export function ArticleDetail() {
  const { slug = '' } = useParams()
  const { articles } = useContentStore()
  const a = articles.find((x) => x.slug === slug)
  if (!a) return <NotFound />
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <main>
      <ImageHero image={a.featuredImage} kicker={`${a.category} · ${a.readTime}`} title={a.title} text={`${a.author} · ${a.date}`} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Guide', to: '/guide' }, { label: a.title }]} /></div>
      <article className="container-x py-12 max-w-3xl">
        <div className="space-y-6 text-[17.5px] leading-relaxed text-slate-700">
          {a.content.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-12 p-6 rounded-3xl bg-sand-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div><p className="font-bold text-ink-900 text-lg">Planning a trip based on this guide?</p><p className="text-slate-600 text-sm mt-0.5">We can match the islands and timing to your exact dates.</p></div>
          <Link to="/plan-trip" className="btn-primary shrink-0">Plan Your Trip</Link>
        </div>
      </article>
      {related.length > 0 && <section className="container-x section-pad border-t border-slate-100"><SectionHeader kicker="More briefings" title="Related articles" link="/guide" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <ArticleCard key={x.slug} a={x} />)}</div></section>}
      <CTASection image={a.cardImage} title="Still have questions?" text="Two minutes on WhatsApp beats twenty tabs." />
    </main>
  )
}
