import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { wa } from '../lib/whatsapp'
import { track } from '../lib/analytics'
import { IconChat, IconMail, IconPin, IconSearch, IconWhatsApp } from './icons'

// Classic agency chrome: white header + navy contact footer.
// Matches the client's reference mockup.

const NAV: [string, string][] = [
  ['Home', '/'],
  ['Hotels', '/stays'],
  ['Tours', '/experiences'],
  ['Packages', '/packages'],
  ['Contact', '/contact'],
]

const SUBS: Record<string, { label: string; to: string }[]> = {
  Home: [
    { label: 'Destinations', to: '/destinations' },
    { label: 'Packages', to: '/packages' },
  ],
  Hotels: [
    { label: 'Resorts', to: '/stays/resorts' },
    { label: 'Local Islands', to: '/stays/local-islands' },
    { label: 'All stays', to: '/stays' },
  ],
  Tours: [
    { label: 'Diving', to: '/experiences/diving' },
    { label: 'Snorkelling', to: '/experiences/snorkelling' },
    { label: 'Surfing', to: '/experiences/surfing' },
    { label: 'All experiences', to: '/experiences' },
  ],
  Packages: [
    { label: 'Honeymoon', to: '/packages/honeymoon' },
    { label: 'Family', to: '/packages/family' },
    { label: 'Luxury', to: '/packages/luxury' },
    { label: 'All packages', to: '/packages' },
  ],
  Contact: [
    { label: 'Plan Your Trip', to: '/plan-trip' },
    { label: 'B2B Partners', to: '/b2b' },
  ],
}

export function Header() {
  const loc = useLocation()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const timer = useRef<number | null>(null)
  const show = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setMounted(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }
  const hide = () => {
    setOpen(false)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMounted(false), 320)
  }
  const hideNow = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(false)
    setMounted(false)
  }
  useEffect(() => {
    hideNow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.pathname ])
  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])
  useEffect(() => {
    document.body.style.overflow = mounted ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mounted ])
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container-x flex items-center justify-between gap-4 h-16 sm:h-[76px]">
        <Link to="/" className="flex items-center shrink-0" aria-label="IslandGo MV home">
          <img src="/logo.jpg" alt="IslandGo MV Travel and Tours logo" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-ink-900" aria-label="Primary">
          {NAV.map(([l, to]) => {
            const active = loc.pathname === to
            return (
              <Link key={l} to={to} aria-current={active ? 'page' : undefined} className={active ? 'text-ocean-600 border-b-2 border-sunset-500 pb-0.5' : 'hover:text-ocean-600'}>
                {l}
              </Link>
            )
          })}
          <Link to="/b2b" aria-current={loc.pathname === '/b2b' ? 'page' : undefined} className={`rounded-full border px-4 py-1.5 text-[14px] font-bold transition-colors ${loc.pathname === '/b2b' ? 'bg-ocean-600 border-ocean-600 text-white' : 'border-ocean-300 text-ocean-700 hover:bg-ocean-600 hover:border-ocean-600 hover:text-white'}`}>
            B2B Partners
          </Link>
        </nav>
        <div className="flex items-center gap-1.5 shrink-0">
          <Link to="/plan-trip" onClick={() => track('plan_trip_click', { from: 'header' })} className="btn-primary !py-2.5 hidden sm:inline-flex">
            🗓 Request a Booking
          </Link>
          <a href={wa.general()} onClick={() => track('whatsapp_click', { from: 'header-mobile' })} aria-label="Chat on WhatsApp" className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-[#25D366] text-white">
            <IconWhatsApp className="w-5 h-5" />
          </a>
          <Link to="/search" aria-label="Search" className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-slate-200 text-ink-900">
            <IconSearch className="w-5 h-5" />
          </Link>
          <button
            className={`lg:hidden w-10 h-10 grid place-items-center rounded-full border transition-all duration-300 ${open ? 'bg-ocean-950 text-white border-ocean-950 rotate-90' : 'border-slate-200 text-ink-900'}`}
            onClick={() => (open ? hide() : show())}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="text-xl leading-none" aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
      {/* Full-screen side drawer (mobile) */}
      {mounted && (
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-ocean-950 text-white flex flex-col transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(520px circle at 90% 8%, rgba(11,122,191,.45), transparent 65%), radial-gradient(420px circle at 8% 95%, rgba(249,115,22,.22), transparent 60%)' }}
        />
        <div className="relative container-x flex items-center justify-between h-16 sm:h-[76px] shrink-0">
          <span className="flex items-center">
            <img src="/logo.jpg" alt="" aria-hidden className="h-10 w-auto rounded-lg bg-white object-contain" />
          </span>
          <button
            className="w-11 h-11 grid place-items-center rounded-full bg-white text-ocean-950 transition-transform duration-300"
            onClick={() => hide()}
            aria-label="Close menu"
          >
            <span className="text-xl leading-none" aria-hidden>✕</span>
          </button>
        </div>
        <nav
          className="relative container-x flex-1 overflow-y-auto flex flex-col py-2"
          aria-label="Mobile"
        >
          {NAV.map(([l, to], i) => (
            <div key={l} className="mnav-item border-b border-white/10 py-4" style={{ '--i': i } as CSSProperties}>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm text-white/30 w-7 shrink-0" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <Link to={to} onClick={() => hideNow()} aria-current={loc.pathname === to ? 'page' : undefined} className="font-display font-semibold text-[32px] leading-none tracking-tight hover:text-sunset-300 transition-colors">{l}</Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 pl-11">
                {SUBS[l]?.map((c) => (
                  <Link key={c.label} to={c.to} onClick={() => setOpen(false)} className="rounded-full bg-white/10 border border-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white/85">{c.label}</Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            to="/b2b"
            onClick={() => hideNow()}
            className="mnav-item border-b border-white/10 py-4"
            style={{ '--i': NAV.length } as CSSProperties}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display text-sm text-white/30 w-7 shrink-0" aria-hidden>{String(NAV.length + 1).padStart(2, '0')}</span>
              <span className="font-display font-semibold text-[32px] leading-none tracking-tight text-sunset-300">B2B Partners</span>
            </div>
          </Link>
        </nav>
        <div className="relative container-x pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shrink-0">
          <Link to="/plan-trip" onClick={() => hideNow()} className="btn-primary w-full !py-3.5">
            🗓 Request a Booking
          </Link>
          <p className="text-center text-[13.5px] text-white/60 font-semibold mt-3">
            <a href={wa.general()}>WhatsApp {site.contact.whatsappDisplay}</a>
            <span className="mx-2" aria-hidden>·</span>
            <a href={`mailto:${site.contact.email}`}>Email us</a>
          </p>
        </div>
      </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-ocean-950 text-white mt-0">
      <div className="container-x py-12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_auto]">
        <div>
          <img src="/logo.jpg" alt="IslandGo MV Travel and Tours logo" className="h-14 w-auto rounded-lg bg-white object-contain" />
          <p className="text-white/60 text-[13.5px] mt-4 max-w-xs">Explore • Discover • Experience Maldives.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-2 mt-5 text-[12.5px] text-white/45">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
            <Link to="/guide" className="hover:text-white">Travel Guide</Link>
            <Link to="/destinations" className="hover:text-white">Destinations</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/b2b" className="hover:text-white">B2B Partners</Link>
          </p>
        </div>
        <div className="text-[14.5px] space-y-3">
          <p className="flex gap-2.5"><IconPin className="w-5 h-5 mt-0.5 shrink-0 text-white/50" /><span>{site.contact.address}</span></p>
          <p className="flex gap-2.5"><IconChat className="w-5 h-5 mt-0.5 shrink-0 text-white/50" /><a href={wa.general()} onClick={() => track('whatsapp_click', { from: 'footer' })} className="hover:text-white font-semibold">{site.contact.whatsappDisplay}<span className="block text-white/55 text-[12.5px] font-normal">Call or WhatsApp</span></a></p>
          <p className="flex gap-2.5"><IconMail className="w-5 h-5 mt-0.5 shrink-0 text-white/50" /><a href={`mailto:${site.contact.email}`} className="hover:text-white font-semibold break-all">{site.contact.email}<span className="block text-white/55 text-[12.5px] font-normal">We reply quickly</span></a></p>
        </div>
        <nav className="grid grid-cols-2 md:grid-cols-1 gap-1.5 text-[14.5px] text-white/80" aria-label="Footer">
          {NAV.map(([l, to]) => <Link key={l} to={to} className="hover:text-white w-fit">{l}</Link>)}
        </nav>
        <div className="flex md:flex-col gap-3 items-start">
          <a href={wa.general()} onClick={() => track('whatsapp_click', { from: 'footer-cta' })} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-bold text-[15px] hover:brightness-110">Chat on WhatsApp ›</a>
          <Link to="/plan-trip" onClick={() => track('plan_trip_click', { from: 'footer' })} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-bold text-[15px] hover:bg-white/10">Plan Your Trip</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-4 flex flex-col sm:flex-row justify-between gap-2 text-[12.5px] text-white/45">
          <p className="flex gap-3"><Link to="/terms" className="hover:text-white">Terms & Conditions</Link><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></p>
          <p>© 2026 IslandGo MV Travel & Tours. All Rights Reserved.</p>
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
      className="fixed bottom-20 lg:bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white hover:scale-105 transition border border-black/10"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  )
}
