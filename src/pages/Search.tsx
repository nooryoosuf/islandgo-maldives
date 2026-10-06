import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchContent } from '../lib/search'
import { Breadcrumbs, CTASection, ImageHero } from '../components/ui'
import { EmptyState } from '../components/feedback'
import { img } from '../data/images'
import { track } from '../lib/analytics'

export function SearchPage() {
  const [sp, setSp] = useSearchParams()
  const [q, setQ] = useState(sp.get('q') ?? '')
  const hits = useMemo(() => searchContent(q), [q])
  return (
    <main>
      <ImageHero image={img.heroBeachWide} kicker="Search · Destinations, stays, packages, guides" title="Search the Maldives" text="Content discovery across our guides — not a live availability search." />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'Search' }]} /></div>
      <section className="container-x py-10 max-w-3xl">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            setSp(q ? { q } : {})
            track('search', { q })
          }}
        >
          <label htmlFor="site-search" className="label">Search</label>
          <div className="flex gap-2">
            <input id="site-search" className="input" placeholder="Try mantas, surf, honeymoon, Maafushi…" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
            <button className="btn-ocean shrink-0" type="submit">Search</button>
          </div>
        </form>
        <div className="mt-8" aria-live="polite">
          {q.trim().length >= 2 && hits.length === 0 && (
            <EmptyState title="No results found" text={`Nothing matches “${q}”. Try “dive”, “surf”, “honeymoon” or “sandbank”.`} actionTo="/destinations" actionLabel="Browse destinations" />
          )}
          {q.trim().length < 2 && (
            <div className="flex flex-wrap gap-2">
              <p className="w-full text-sm font-bold text-slate-500 uppercase tracking-wide">Popular:</p>
              {['mantas', 'surf', 'honeymoon', 'sandbank', 'diving', 'Maafushi'].map((s) => (
                <button key={s} onClick={() => { setQ(s); setSp({ q: s }) }} className="chip bg-slate-100 hover:bg-ocean-50 border border-slate-200">{s}</button>
              ))}
            </div>
          )}
          <ul className="mt-4 space-y-3">
            {hits.map((h) => (
              <li key={h.to}>
                <Link to={h.to} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3 hover:border-ocean-300 bg-white">
                  <img src={h.image} alt="" loading="lazy" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <span>
                    <span className="chip bg-ocean-50 text-ocean-700 !text-[11px]">{h.kind}</span>
                    <span className="block font-bold text-ink-900">{h.title}</span>
                    <span className="block text-slate-500 text-[13.5px]">{h.sub}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection image={img.sunsetBeach} title="Can't find it? Ask a human." text="Two minutes on WhatsApp beats twenty tabs." />
    </main>
  )
}
