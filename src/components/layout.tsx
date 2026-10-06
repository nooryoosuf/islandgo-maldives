import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../config/site'
import { wa, whatsappLink } from '../lib/whatsapp'
import { track } from '../lib/analytics'
import { SearchBox } from './SearchBox'

const menus: { label: string; to: string; children: { label: string; to: string; desc: string }[] }[] = [
  {
    label: 'Explore',
    to: '/destinations',
    children: [
      { label: 'Destinations', to: '/destinations', desc: 'Atolls & local islands' },
      { label: 'Resorts & Hotels', to: '/stays?type=resort', desc: 'Overwater villas & resorts' },
      { label: 'Local Islands', to: '/stays?type=local-island', desc: 'Guesthouses & culture' },
      { label: 'All stays', to: '/stays', desc: 'Everywhere to sleep' },
    ],
  },
  {
    label: 'Packages',
    to: '/packages',
    children: [
      { label: 'All packages', to: '/packages', desc: 'Honeymoon to budget' },
      { label: 'Honeymoon', to: '/packages?cat=honeymoon', desc: 'Private & romantic' },
      { label: 'Family', to: '/packages?cat=family', desc: 'Kid-friendly reefs' },
      { label: 'Adventure & Diving', to: '/packages?cat=adventure', desc: 'Channels & surf' },
    ],
  },
  {
    label: 'Experiences',
    to: '/experiences',
    children: [
      { label: 'Diving', to: '/experiences?q=diving', desc: 'Thilas & channels' },
      { label: 'Snorkelling', to: '/experiences?q=snorkel', desc: 'Mantas & turtles' },
      { label: 'Surfing', to: '/experiences?q=surf', desc: 'Cokes & Chickens' },
      { label: 'All experiences', to: '/experiences', desc: 'Cruises, fishing & more' },
    ],
  },
  {
    label: 'Travel Guide',
    to: '/guide',
    children: [
      { label: 'Maldives guide', to: '/guide', desc: 'First-timer essentials' },
      { label: 'Travel tips', to: '/guide', desc: 'Packing, money, weather' },
      { label: 'Offers', to: '/offers', desc: 'Seasonal value' },
    ],
  },
  { label: 'About', to: '/about', children: [{ label: 'About us', to: '/about', desc: 'Who we are' }, { label: 'Contact', to: '/contact', desc: 'Talk to a human' }] },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [loc.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open ])

  const solid = scrolled && !open
  const ink = solid ? 'text-ink-900' : 'text-white'
  const sub = solid ? 'text-slate-500' : 'text-white/70'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/70' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="relative z-50 container-x flex items-center justify-between h-[72px] gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${site.name} home`}>
          <span className="grid place-items-center w-10 h-10 rounded-2xl bg-ocean-600 text-white text-xl" aria-hidden>◍</span>
          <span className="leading-tight">
            <span className={`block font-display font-bold text-[20px] transition-colors ${ink}`}>IslandGo <span className={solid ? 'text-ocean-600' : 'text-sunset-300'}>Maldives</span></span>
            <span className={`block text-[11.5px] font-semibold tracking-wide uppercase transition-colors ${sub}`}>Sunny side travel studio</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2" aria-label="Primary">
          {menus.map((m) => (
            <div key={m.label} className="relative" onMouseEnter={() => setDrop(m.label)} onMouseLeave={() => setDrop(null)}>
              <NavLink
                to={m.to}
                className={() => {
                  const active = loc.pathname === m.to || loc.pathname.startsWith(m.to + '/')
                  if (active) return `px-4 py-2 rounded-full text-[15px] font-semibold ${solid ? 'text-ocean-700 bg-ocean-50' : 'text-white bg-white/15'}`
                  return `px-4 py-2 rounded-full text-[15px] font-semibold transition-colors ${solid ? 'text-ink-900 hover:bg-slate-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`
                }}
              >
                {m.label}
              </NavLink>
              {drop === m.label && (
                <div className="absolute left-0 top-full pt-2 w-72">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-2">
                    {m.children.map((c) => (
                      <Link key={c.label} to={c.to} className="block px-3.5 py-2.5 rounded-xl hover:bg-ocean-50">
                        <span className="block text-[15px] font-bold text-ink-900">{c.label}</span>
                        <span className="block text-[13px] text-slate-500">{c.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <SearchBox solid={solid} />
          <Link to="/search" className={`xl:hidden w-10 h-10 grid place-items-center rounded-full border transition-colors ${solid ? 'border-slate-200' : 'border-white/30 text-white'}`} aria-label="Search">⌕</Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Link to="/search" className={`w-11 h-11 grid place-items-center rounded-xl border transition-colors ${solid ? 'border-slate-200 text-ink-900' : 'border-white/30 text-white'}`} aria-label="Search">⌕</Link>
          <button
            className={`w-11 h-11 grid place-items-center border transition-all duration-300 ${
              open
                ? 'rounded-full bg-white text-ocean-950 border-white rotate-90'
                : `rounded-xl ${solid ? 'border-slate-200 text-ink-900' : 'border-white/30 text-white'}`
            }`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="text-xl leading-none" aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-ocean-950 text-white overflow-y-auto">
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            aria-hidden
            style={{ background: 'radial-gradient(600px circle at 85% 10%, rgba(11,122,191,.5), transparent 65%), radial-gradient(500px circle at 10% 90%, rgba(249,115,22,.28), transparent 60%)' }}
          />
          <div className="relative container-x pt-28 pb-10 min-h-full flex flex-col">
            <form role="search" className="mnav-item" style={{ '--i': 0 } as CSSProperties} onSubmit={(e) => { e.preventDefault(); setOpen(false); if (q.trim()) nav(`/search?q=${encodeURIComponent(q.trim())}`) }}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mantas, surf, honeymoon…" aria-label="Search the site" className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/50 outline-none focus:border-white/60" />
            </form>
            <nav className="flex flex-col mt-4" aria-label="Mobile">
              {menus.map((m, i) => (
                <div key={m.label} className="mnav-item border-b border-white/10 py-5" style={{ '--i': i + 1 } as CSSProperties}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm text-white/30 w-7 shrink-0" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                    <Link to={m.to} onClick={() => setOpen(false)} className="font-display font-semibold text-4xl tracking-tight hover:text-sunset-300 transition-colors">{m.label}</Link>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3.5 pl-11">
                    {m.children.map((c) => (
                      <Link key={c.label} to={c.to} onClick={() => setOpen(false)} className="rounded-full bg-white/10 border border-white/10 px-3.5 py-1.5 text-[13.5px] font-semibold text-white/85 hover:bg-white/20">{c.label}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mnav-item mt-auto pt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px]" style={{ '--i': menus.length + 1 } as CSSProperties}>
              <Link to="/plan-trip" onClick={() => setOpen(false)} className="font-bold text-sunset-300">Plan Your Trip →</Link>
              <a href={wa.general()} className="text-white/70 font-semibold">WhatsApp {site.contact.whatsappDisplay}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const socials = Object.entries(site.social).filter(([, v]) => v) as [string, string][]
  return (
    <footer className="bg-ocean-950 text-white mt-0">
      <div className="container-x pt-14 pb-8">
        <p className="font-display font-semibold text-[clamp(2.5rem,7vw,5rem)] leading-none text-white/95" aria-hidden>
          Sunny side<span className="text-sunset-400">.</span>
        </p>
      </div>
      <div className="container-x pb-14 grid gap-10 md:grid-cols-4 border-t border-white/10 pt-10">
        <div>
          <p className="font-display font-bold text-2xl">IslandGo <span className="text-sunset-400">Maldives</span></p>
          <p className="text-white/70 text-[15px] mt-3 leading-relaxed">A Malé-based travel studio for the sunny side of the Maldives — destinations, stays, experiences and honest planning help.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <a href={wa.general()} onClick={() => track('whatsapp_click', { from: 'footer' })} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">WhatsApp</a>
            <Link to="/plan-trip" className="rounded-full bg-sunset-500 px-4 py-2 text-sm font-bold hover:bg-sunset-600">Plan Your Trip →</Link>
          </div>
          {socials.length > 0 && (
            <div className="flex gap-2 mt-4">
              {socials.map(([k, url]) => <a key={k} href={url} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold capitalize hover:bg-white/20">{k}</a>)}
            </div>
          )}
        </div>
        <nav aria-label="Explore">
          <p className="font-bold text-sm uppercase tracking-wider text-white/60 mb-3">Explore</p>
          {[['Destinations', '/destinations'], ['Resorts & stays', '/stays'], ['Packages', '/packages'], ['Experiences', '/experiences']].map(([l, t]) => <Link key={t + l} to={t} className="block py-1.5 text-white/85 hover:text-white w-fit u-link">{l}</Link>)}
        </nav>
        <nav aria-label="Guide">
          <p className="font-bold text-sm uppercase tracking-wider text-white/60 mb-3">Guide</p>
          {[['Travel guide', '/guide'], ['Search', '/search'], ['Offers', '/offers'], ['About us', '/about'], ['Contact', '/contact']].map(([l, t]) => <Link key={t + l} to={t} className="block py-1.5 text-white/85 hover:text-white w-fit u-link">{l}</Link>)}
        </nav>
        <div>
          <p className="font-bold text-sm uppercase tracking-wider text-white/60 mb-3">Contact</p>
          <p className="text-white/85 text-[15px]">{site.contact.address}<br /><a className="hover:text-white" href={`mailto:${site.contact.email}`}>{site.contact.email}</a><br /><a className="hover:text-white" href={whatsappLink('Hi!')}>{site.contact.whatsappDisplay} (WhatsApp)</a><br /><span className="text-white/60 text-[13px]">{site.contact.hours}</span></p>
          <p className="text-white/50 text-[13px] mt-3">No booking engine, no fake availability — real humans, real quotes.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row justify-between gap-2 text-[13px] text-white/50">
          <p>© 2026 {site.name}. Placeholder photography via Unsplash — replace with agency shoots.</p>
          <p className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
            <Link to="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  return (
    <a
      href={wa.general()}
      onClick={() => track('whatsapp_click', { from: 'float' })}
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="fixed bottom-20 lg:bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl hover:scale-105 transition border border-black/10"
    >
      <span aria-hidden>✆</span>
    </a>
  )
}
