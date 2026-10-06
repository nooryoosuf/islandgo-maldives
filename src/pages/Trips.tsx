import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { packages, getPackage } from '../data/packages'
import { experiences, getExperience } from '../data/experiences'
import { getDestination } from '../data/destinations'
import { getProperty } from '../data/properties'
import { articles, getArticle } from '../data/articles'
import { Breadcrumbs, CTASection, ExperienceCard, Gallery, ImageHero, PackageCard, ArticleCard, SectionHeader, DestinationCard, StickyEnquire } from '../components/ui'
import { EnquiryForm, FilterBar } from '../components/forms'
import { wa } from '../lib/whatsapp'
import { EmptyState } from '../components/feedback'
import { NotFound } from './Explore'

// ---------- PACKAGES ----------
export function PackagesList() {
  const [sp] = useSearchParams()
  const [q, setQ] = useState('')
  const cat = sp.get('cat') ?? ''
  const list = useMemo(() => packages.filter((p) => {
    const okC = !cat || p.category.includes(cat as never)
    const okQ = !q || (p.name + p.description).toLowerCase().includes(q.toLowerCase())
    return okC && okQ
  }), [q, cat])
  return (
    <main>
      <ImageHero image={packages[0].heroImage} kicker="Packages · Flexible starting points" title="Packages" text="Honeymoon to budget — every itinerary is tailored to your dates. No checkout, just enquire." />
      <section className="container-x section-pad">
        <FilterBar value={q} onChange={setQ} placeholder="Search honeymoon, diving, budget…" options={[{ label: 'Honeymoon', value: 'honeymoon' }, { label: 'Family', value: 'family' }, { label: 'Luxury', value: 'luxury' }, { label: 'Adventure', value: 'adventure' }, { label: 'Budget', value: 'budget' }]} />
        {cat && <p className="mt-3 text-sm text-slate-500">Filtered: <b className="text-ink-900 capitalize">{cat}</b> · <Link to="/packages" className="text-ocean-700 font-bold">clear</Link></p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">{list.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        {list.length === 0 && <div className="mt-8"><EmptyState title="No packages found" text="Try another travel style — or tell us your dates and we'll build one around you." actionTo="/plan-trip" actionLabel="Ask for a custom trip" /></div>}
      </section>
      <CTASection image={packages[1].cardImage} title="Want it tweaked?" text="Add nights, swap islands, upgrade the villa — quotes in hours." />
    </main>
  )
}

export function PackageDetail() {
  const { slug = '' } = useParams()
  const p = getPackage(slug)
  if (!p) return <NotFound />
  const related = packages.filter((x) => x.slug !== p.slug).slice(0, 3)
  return (
    <main>
      <ImageHero image={p.heroImage} kicker={`${p.duration} · ${p.groupSize}`} title={p.name} text={p.priceHint} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Packages', to: '/packages' }, { label: p.name }]} /></div>
      <section className="container-x py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <h2 className="h-display text-3xl">Overview</h2>
          <p className="text-[17px] text-slate-700 mt-3 leading-relaxed">{p.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {p.destinationSlugs.map((s) => { const d = getDestination(s); return d ? <Link key={s} to={`/destinations/${s}`} className="chip bg-ocean-50 text-ocean-800">◍ {d.name}</Link> : null })}
            {(p.propertySlugs ?? []).map((s) => { const st = getProperty(s); return st ? <Link key={s} to={`/stays/${s}`} className="chip bg-sand-100 text-ink-700">⌂ {st.name}</Link> : null })}
          </div>
          <h3 className="h-display text-2xl mt-10">Day by day</h3>
          <ol className="mt-4 space-y-3">{p.itinerary.map((it) => <li key={it.day} className="rounded-2xl border border-slate-200 p-5"><p className="text-[12px] font-bold uppercase tracking-wider text-sunset-600">{it.day}</p><p className="font-bold text-ink-900">{it.title}</p><p className="text-slate-600 text-[15px] mt-1">{it.text}</p></li>)}</ol>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-5"><p className="font-bold text-emerald-900">What’s included</p><ul className="mt-2 space-y-1.5">{p.included.map((i) => <li key={i} className="text-[14.5px] text-emerald-950">✓ {i}</li>)}</ul></div>
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5"><p className="font-bold text-ink-900">Not included</p><ul className="mt-2 space-y-1.5">{p.notIncluded.map((i) => <li key={i} className="text-[14.5px] text-slate-600">· {i}</li>)}</ul></div>
          </div>
          <h3 className="h-display text-2xl mt-8">Optional add-ons</h3>
          <div className="flex flex-wrap gap-2 mt-3">{p.addOns.map((a) => <span key={a} className="chip bg-white border border-slate-200 text-ink-700">+ {a}</span>)}</div>
          <h3 className="h-display text-2xl mt-8">Gallery</h3>
          <div className="mt-4"><Gallery images={p.gallery} alt={p.name} /></div>
        </div>
        <aside className="space-y-5">
          <div className="card p-6"><p className="font-display text-xl text-ink-900">{p.priceHint}</p><p className="text-slate-500 text-sm">{p.duration}</p>
            <Link to={`/plan-trip?package=${p.slug}`} className="btn-primary w-full mt-4">Enquire about this trip</Link></div>
          <EnquiryForm context={p.name} />
        </aside>
      </section>
      <section className="container-x pb-16"><SectionHeader kicker="Keep looking" title="Related packages" link="/packages" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <PackageCard key={x.slug} p={x} />)}</div></section>
      <CTASection image={p.gallery[0]} title="Make it yours." text="Same idea, your dates, your pace." />
      <StickyEnquire label={p.name} planTo={`/plan-trip?package=${p.slug}`} waHref={wa.pkg(p.name)} />
    </main>
  )
}

// ---------- EXPERIENCES ----------
function ExpRow({ e, i }: { e: (typeof experiences)[number]; i: number }) {
  return (
    <Link to={`/experiences/${e.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6 border-t border-slate-200 last:border-b">
      <span className="font-display text-xl sm:text-2xl text-slate-300 w-8" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
      <span className="flex items-center gap-4 sm:gap-5 min-w-0">
        <span className="img-zoom hidden sm:block w-28 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border border-slate-200/70 shrink-0">
          <img src={e.cardImage} alt="" aria-hidden loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11.5px] font-bold uppercase tracking-[0.14em] text-sunset-600">{e.category}</span>
          <span className="block font-display text-[20px] sm:text-[23px] leading-snug text-ink-900 group-hover:text-ocean-700 transition-colors mt-1">{e.name}</span>
          <span className="block text-[13px] text-slate-500 mt-1 font-semibold">{e.duration} · {e.priceHint}</span>
        </span>
      </span>
      <span className="grid place-items-center w-11 h-11 rounded-full border border-slate-300 text-ink-900 transition-all duration-300 group-hover:bg-ocean-600 group-hover:border-ocean-600 group-hover:text-white shrink-0" aria-hidden>→</span>
    </Link>
  )
}

export function ExperiencesList() {
  const [sp] = useSearchParams()
  const [q, setQ] = useState(sp.get('q') ?? '')
  const list = experiences.filter((e) => !q || (e.name + e.category + e.description).toLowerCase().includes(q.toLowerCase()))
  const [featured, ...rest] = list
  return (
    <main>
      <ImageHero image={experiences[0].heroImage} kicker="Experiences · Diving to culture" title="Experiences" text="Mantas, channels, surf boats and village teas — the days between beach naps." />
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
          <h2 className="h-display text-2xl sm:text-3xl">All experiences</h2>
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
      <CTASection image={experiences[3].cardImage} title="Bundle experiences into a day." text="Sandbank morning + dolphin sunset is our favourite combo." />
    </main>
  )
}

export function ExperienceDetail() {
  const { slug = '' } = useParams()
  const e = getExperience(slug)
  if (!e) return <NotFound />
  const idx = experiences.findIndex((x) => x.slug === e.slug)
  const prev = idx > 0 ? experiences[idx - 1] : undefined
  const next = idx < experiences.length - 1 ? experiences[idx + 1] : undefined
  const related = experiences.filter((x) => x.slug !== e.slug && x.category === e.category).concat(experiences.filter((x) => x.slug !== e.slug && x.category !== e.category)).slice(0, 3)
  return (
    <main>
      <ImageHero image={e.heroImage} kicker={`${e.category} · ${e.location}`} title={e.name} text={`${e.duration} · ${e.groupSize} · ${e.priceHint}`} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Experiences', to: '/experiences' }, { label: e.name }]} /></div>
      <section className="container-x py-10 sm:py-14 grid lg:grid-cols-[minmax(0,44rem)_1fr] gap-12 justify-center">
        <div className="min-w-0">
          {/* Fact band */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 border-b border-slate-200 m-0">
            {[
              ['Duration', e.duration],
              ['Group', e.groupSize],
              ['Where', e.location],
              ['From', e.priceHint],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">{k}</dt>
                <dd className="font-bold text-ink-900 text-[15px] mt-1 m-0">{v}</dd>
              </div>
            ))}
          </dl>
          {/* Lede + body */}
          <p className="article-lede mt-8">{e.description}</p>
          <p className="article-body dropcap mt-6">{e.details}</p>
          <p className="kicker mt-12">What you’ll experience</p>
          <ul className="grid sm:grid-cols-2 gap-2.5 mt-5 m-0 p-0 list-none">{e.whatYouGet.map((w) => <li key={w} className="rounded-2xl border border-slate-200 p-4 text-[15px] font-semibold text-ink-900">✓ {w}</li>)}</ul>
          <div className="rounded-2xl bg-ocean-50 border border-ocean-100 p-5 sm:p-6 mt-6"><p className="font-bold text-ocean-900">Good to know</p><p className="text-ocean-950/70 text-[15.5px] leading-relaxed mt-1.5">{e.requirements}</p></div>
          <p className="kicker mt-12">Gallery</p>
          <div className="mt-5"><Gallery images={e.gallery} alt={e.name} /></div>
          {/* Prev / Next */}
          <nav className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-200" aria-label="More experiences">
            {prev ? (
              <Link to={`/experiences/${prev.slug}`} className="group rounded-2xl border border-slate-200 p-5 hover:border-ocean-300 transition-colors">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">← Previous</span>
                <span className="block font-display text-[18px] text-ink-900 group-hover:text-ocean-700 transition-colors mt-1.5 leading-snug">{prev.name}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/experiences/${next.slug}`} className="group rounded-2xl border border-slate-200 p-5 hover:border-ocean-300 transition-colors sm:text-right">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">Next →</span>
                <span className="block font-display text-[18px] text-ink-900 group-hover:text-ocean-700 transition-colors mt-1.5 leading-snug">{next.name}</span>
              </Link>
            )}
          </nav>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 self-start">
          <div className="card p-6"><p className="font-display text-xl text-ink-900">{e.priceHint}</p><p className="text-slate-500 text-sm">{e.duration} · {e.groupSize}</p>
            <Link to={`/plan-trip?experience=${e.slug}`} className="btn-primary w-full mt-4">Enquire about this experience</Link></div>
          <EnquiryForm context={e.name} />
        </aside>
      </section>
      <section className="container-x pb-16"><SectionHeader kicker="More to try" title="Related experiences" link="/experiences" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <ExperienceCard key={x.slug} e={x} />)}</div></section>
      <CTASection image={e.gallery[0]} title={`Add ${e.name} to your trip.`} text="Tell us your dates — we handle permits, boats and timing." />
      <StickyEnquire label={e.name} planTo={`/plan-trip?experience=${e.slug}`} waHref={wa.experience(e.name)} />
    </main>
  )
}

// ---------- GUIDE ----------
function GuideRow({ a, i }: { a: (typeof articles)[number]; i: number }) {
  return (
    <Link to={`/guide/${a.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6 border-t border-slate-200 last:border-b">
      <span className="font-display text-xl sm:text-2xl text-slate-300 w-8" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
      <span className="flex items-center gap-4 sm:gap-5 min-w-0">
        <span className="img-zoom hidden sm:block w-28 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border border-slate-200/70 shrink-0">
          <img src={a.cardImage} alt="" aria-hidden loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11.5px] font-bold uppercase tracking-[0.14em] text-sunset-600">{a.category}</span>
          <span className="block font-display text-[20px] sm:text-[23px] leading-snug text-ink-900 group-hover:text-ocean-700 transition-colors mt-1">{a.title}</span>
          <span className="block text-[13px] text-slate-500 mt-1 font-semibold">{a.readTime} · {a.date}</span>
        </span>
      </span>
      <span className="grid place-items-center w-11 h-11 rounded-full border border-slate-300 text-ink-900 transition-all duration-300 group-hover:bg-ocean-600 group-hover:border-ocean-600 group-hover:text-white shrink-0" aria-hidden>→</span>
    </Link>
  )
}

export function GuideList() {
  const [q, setQ] = useState('')
  const list = articles.filter((a) => !q || (a.title + a.category + a.excerpt).toLowerCase().includes(q.toLowerCase()))
  const [featured, ...rest] = list
  return (
    <main>
      <ImageHero image={articles[0].featuredImage} kicker="Travel guide · Honest, local, practical" title="Maldives travel guide" text="First-timer briefings, atoll notes and etiquette that keeps reefs (and hosts) happy." />
      <section className="container-x section-pad">
        {featured && (
          <Link to={`/guide/${featured.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:gap-12 items-center pb-12">
            <span className="img-zoom block lg:col-span-7 rounded-[1.6rem] overflow-hidden border border-slate-200/70">
              <img src={featured.featuredImage} alt={featured.title} decoding="async" className="w-full aspect-[16/9] object-cover" />
            </span>
            <span className="lg:col-span-5">
              <span className="kicker">Featured · {featured.category}</span>
              <span className="block font-display font-semibold tracking-tight text-ink-900 group-hover:text-ocean-700 transition-colors text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.08] mt-4">{featured.title}</span>
              <span className="block text-slate-600 text-[16px] leading-relaxed mt-4">{featured.excerpt}</span>
              <span className="block text-[13.5px] font-semibold text-slate-500 mt-4">{featured.author} · {featured.date} · {featured.readTime}</span>
              <span className="alink mt-5 text-[15px]">Read guide <span className="arr" aria-hidden>→</span></span>
            </span>
          </Link>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4 pt-4">
          <h2 className="h-display text-2xl sm:text-3xl">All stories</h2>
          <div className="w-full sm:w-72">
            <label htmlFor="guide-search" className="label">Search stories</label>
            <input id="guide-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try mantas, surf, packing…" className="input !py-2.5" />
          </div>
        </div>
        {list.length === 0 && <div className="mt-8"><EmptyState title="No articles found" text="Try a different keyword — or start with our first-timer guide." actionTo="/guide" actionLabel="View all guides" /></div>}
        <div className="mt-6">
          {rest.map((a, i) => <GuideRow key={a.slug} a={a} i={i} />)}
        </div>
      </section>
      <CTASection image={articles[1].featuredImage} title="Still have questions?" text="Ask a human who lives here — faster than 20 tabs." />
    </main>
  )
}

export function ArticleDetail() {
  const { slug = '' } = useParams()
  const a = getArticle(slug)
  if (!a) return <NotFound />
  const idx = articles.findIndex((x) => x.slug === a.slug)
  const prev = idx > 0 ? articles[idx - 1] : undefined
  const next = idx < articles.length - 1 ? articles[idx + 1] : undefined
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3)
  const initials = a.author.split('·')[0].trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <main>
      <ImageHero image={a.featuredImage} kicker={`${a.category} · ${a.readTime}`} title={a.title} text={`${a.author} · ${a.date}`} />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Guide', to: '/guide' }, { label: a.title }]} /></div>
      <section className="container-x py-10 sm:py-14 grid lg:grid-cols-[minmax(0,44rem)_1fr] gap-12 justify-center">
        <article className="min-w-0">
          {/* Byline */}
          <div className="flex items-center gap-3.5 pb-8 border-b border-slate-200">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-ocean-600 text-white font-display font-bold text-[17px] shrink-0" aria-hidden>{initials}</span>
            <div>
              <p className="font-bold text-ink-900 text-[15.5px]">{a.author}</p>
              <p className="text-slate-500 text-[13.5px] font-semibold">{a.date} · {a.readTime}</p>
            </div>
          </div>
          {/* Body: lede + drop-cap hierarchy */}
          <p className="article-lede mt-8">{a.excerpt}</p>
          <div className="mt-6 space-y-6">
            {a.content.map((p, i) => (
              <p key={i} className={`article-body ${i === 0 ? 'dropcap' : ''}`}>{p}</p>
            ))}
          </div>
          {((a.relatedDestinationSlugs ?? []).length > 0) && (
            <div className="mt-12">
              <p className="kicker">Mentioned in this guide</p>
              <div className="grid sm:grid-cols-2 gap-5 mt-5">{a.relatedDestinationSlugs!.map((s) => { const d = getDestination(s); return d ? <DestinationCard key={s} d={d} /> : null })}</div>
            </div>
          )}
          {/* Prev / Next */}
          <nav className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-200" aria-label="More guides">
            {prev ? (
              <Link to={`/guide/${prev.slug}`} className="group rounded-2xl border border-slate-200 p-5 hover:border-ocean-300 transition-colors">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">← Newer</span>
                <span className="block font-display text-[18px] text-ink-900 group-hover:text-ocean-700 transition-colors mt-1.5 leading-snug">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/guide/${next.slug}`} className="group rounded-2xl border border-slate-200 p-5 hover:border-ocean-300 transition-colors sm:text-right">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">Older →</span>
                <span className="block font-display text-[18px] text-ink-900 group-hover:text-ocean-700 transition-colors mt-1.5 leading-snug">{next.title}</span>
              </Link>
            )}
          </nav>
        </article>
        <aside className="space-y-5 lg:sticky lg:top-28 self-start">
          <EnquiryForm context="trip planning" />
          <div className="card p-6"><p className="font-bold text-ink-900">Planning a trip?</p><p className="text-slate-500 text-sm mt-1">Get 2–3 island options for your dates.</p><Link to="/plan-trip" className="btn-ocean w-full mt-4">Plan Your Trip</Link></div>
        </aside>
      </section>
      <section className="container-x pb-16"><SectionHeader kicker="Keep reading" title="Related articles" link="/guide" /><div className="grid sm:grid-cols-3 gap-5">{related.map((x) => <ArticleCard key={x.slug} a={x} />)}</div></section>
    </main>
  )
}
