import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Article, Destination, Experience, Package, Property } from '../data/types'
import { Reveal } from './motion'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop'

function Img({ src, alt, ratio = 'aspect-[4/3]', eager }: { src: string; alt: string; ratio?: string; eager?: boolean }) {
  return (
    <div className="img-zoom overflow-hidden bg-ocean-50/60">
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          if ((e.target as HTMLImageElement).src !== FALLBACK_IMG) (e.target as HTMLImageElement).src = FALLBACK_IMG
        }}
        className={`w-full h-full object-cover ${ratio}`}
      />
    </div>
  )
}

// ---------- Editorial section header ----------
export function SectionHeader({ kicker, title, text, link, linkLabel }: { kicker: string; title: string; text?: string; link?: string; linkLabel?: string }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-5 mb-9 sm:mb-12">
      <div className="max-w-2xl">
        <p className="kicker mb-3">{kicker}</p>
        <h2 className="display-xl">{title}</h2>
        {text && <p className="text-slate-600 text-[16.5px] mt-3 leading-relaxed max-w-xl">{text}</p>}
      </div>
      {link && (
        <Link to={link} className="alink text-[15px] shrink-0">
          {linkLabel ?? 'View all'} <span className="arr" aria-hidden>→</span>
        </Link>
      )}
    </Reveal>
  )
}

// ---------- Breadcrumbs ----------
export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="text-[13.5px] text-slate-500 flex flex-wrap gap-1.5 items-center" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-1.5 items-center m-0 p-0 list-none">
        <li><Link to="/" className="hover:text-ocean-700 font-semibold">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-slate-300" aria-hidden>/</span>
            {it.to ? <Link to={it.to} className="hover:text-ocean-700 font-semibold">{it.label}</Link> : <span aria-current="page" className="text-sunset-600 font-bold">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ---------- Page hero (inner pages) ----------
export function ImageHero({ image, kicker, title, text, children }: { image: string; kicker: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ocean-950" aria-label={title}>
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = FALLBACK_IMG
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/75 via-ocean-950/20 to-ocean-950/30" aria-hidden />
      </div>
      {/* top padding clears the fixed header */}
      <div className="relative container-x pt-36 sm:pt-44 pb-14 sm:pb-20 text-white page-in">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.12em] mb-4">{kicker}</p>
        <h1 className="font-display font-semibold tracking-tight text-[clamp(2.25rem,5.5vw,4rem)] max-w-3xl leading-[1.04]">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-white/85 text-[17px] leading-relaxed">{text}</p>}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}

// ---------- Full-bleed CTA ----------
export function CTASection({ image, title, text }: { image: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden" aria-label={title}>
      <img src={image} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/80 via-ocean-950/45 to-ocean-950/10" aria-hidden />
      <div className="relative container-x py-20 sm:py-28 text-white max-w-7xl">
        <Reveal>
          <p className="kicker !text-sunset-300 mb-4">Ready to go</p>
          <h2 className="font-display font-semibold tracking-tight text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] max-w-2xl">{title}</h2>
          <p className="mt-4 max-w-xl text-white/85 text-[17px] leading-relaxed">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/plan-trip" className="btn-primary !px-7 !py-3.5 !text-base">Plan Your Trip <span className="arr" aria-hidden>→</span></Link>
            <a href="https://wa.me/9607500000" className="btn-outline-light !px-7 !py-3.5 !text-base">WhatsApp us</a>
          </div>
          <p className="mt-5 text-[13px] text-white/60 font-semibold">Free planning help · reply within hours · no payment needed</p>
        </Reveal>
      </div>
    </section>
  )
}

// ---------- Gallery ----------
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.slice(0, 4).map((src, i) => (
        <div key={i} className={`img-zoom rounded-2xl overflow-hidden border border-slate-200/70 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
          <img src={src} alt={`${alt} — photo ${i + 1}`} loading="lazy" decoding="async" className={`w-full object-cover ${i === 0 ? 'h-full min-h-[280px]' : 'aspect-[4/3]'}`} />
        </div>
      ))}
    </div>
  )
}

// ---------- Sticky mobile enquiry bar (detail pages, small screens only) ----------
export function StickyEnquire({ label, planTo, waHref }: { label: string; planTo: string; waHref: string }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur px-4 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))]">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 truncate">{label}</p>
      <div className="flex gap-2 mt-1.5">
        <a href={waHref} className="btn-ghost flex-1 !py-2.5 !text-[14px]">WhatsApp</a>
        <Link to={planTo} className="btn-primary flex-1 !py-2.5 !text-[14px]">Enquire <span className="arr" aria-hidden>→</span></Link>
      </div>
    </div>
  )
}

// ---------- Cards: borders + photography, no shadows ----------

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link to={`/destinations/${d.slug}`} className="card card-hover img-zoom group block">
      <Img src={d.cardImage} alt={d.name} ratio="aspect-[4/3]" />
      <div className="p-5 sm:p-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-ocean-600">{d.atoll}</p>
        <h3 className="font-display text-[24px] text-ink-900 group-hover:text-ocean-700 transition-colors mt-1">{d.name}</h3>
        <p className="text-slate-600 text-[15px] mt-1.5 line-clamp-2">{d.tagline}</p>
        <span className="alink mt-4 text-[14.5px] text-sunset-600">Explore <span className="arr" aria-hidden>→</span></span>
      </div>
    </Link>
  )
}

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link to={`/stays/${p.slug}`} className="card card-hover img-zoom group block">
      <div className="relative">
        <Img src={p.cardImage} alt={p.name} ratio="aspect-[16/11]" />
        <span className="absolute top-4 left-4 chip bg-white/95 text-ink-900 capitalize !text-[12px] font-bold">{p.type.replace('-', ' ')}</span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-slate-500">{p.location}</p>
        <h3 className="font-display text-[24px] leading-tight text-ink-900 group-hover:text-ocean-700 transition-colors mt-1">{p.name}</h3>
        <p className="text-[14px] text-slate-600 mt-2 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-[14px] font-bold text-ink-900">{p.priceHint}</p>
          <span className="alink text-[14.5px] text-sunset-600">Explore <span className="arr" aria-hidden>→</span></span>
        </div>
      </div>
    </Link>
  )
}

export function PackageCard({ p }: { p: Package }) {
  return (
    <Link to={`/packages/${p.slug}`} className="card card-hover img-zoom group block">
      <div className="relative">
        <Img src={p.cardImage} alt={p.name} ratio="aspect-[16/10]" />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {p.duration} <span className="text-lagoon-600 mx-1" aria-hidden>·</span> <span className="text-sunset-600 capitalize">{p.category[0]?.replace('-', ' ')}</span>
        </p>
        <h3 className="font-display text-[24px] leading-tight text-ink-900 group-hover:text-ocean-700 transition-colors mt-2">{p.name}</h3>
        <p className="text-slate-600 text-[15px] mt-2 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-[14px] font-bold text-ink-900">{p.priceHint}</p>
          <span className="alink text-[14.5px] text-sunset-600">Explore trip <span className="arr" aria-hidden>→</span></span>
        </div>
      </div>
    </Link>
  )
}

// Discovery-style overlay card: photography first, text on image.
export function ExperienceCard({ e }: { e: Experience }) {
  return (
    <Link to={`/experiences/${e.slug}`} className="group relative block overflow-hidden rounded-[1.4rem] border border-slate-200/70 min-h-[300px] h-full img-zoom">
      <img src={e.cardImage} alt={e.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/25 to-transparent" aria-hidden />
      <span className="absolute top-4 left-4 chip bg-white/15 text-white border border-white/25 backdrop-blur !text-[12px]">{e.category}</span>
      <div className="absolute bottom-0 inset-x-0 p-5 text-white">
        <h3 className="font-display text-[22px] leading-tight">{e.name}</h3>
        <p className="text-white/75 text-[13.5px] font-semibold mt-1">{e.duration} · {e.priceHint}</p>
        <span className="alink alink-light mt-2.5 text-[14px]">Discover <span className="arr" aria-hidden>→</span></span>
      </div>
    </Link>
  )
}

export function ArticleCard({ a, large }: { a: Article; large?: boolean }) {
  return (
    <Link to={`/guide/${a.slug}`} className="card card-hover img-zoom group block">
      <Img src={a.cardImage} alt={a.title} ratio={large ? 'aspect-[16/8]' : 'aspect-[16/10]'} />
      <div className="p-5 sm:p-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-sunset-600">{a.category} <span className="text-slate-400 normal-case tracking-normal font-semibold">· {a.readTime}</span></p>
        <h3 className={`font-display text-ink-900 group-hover:text-ocean-700 transition-colors leading-tight mt-2 ${large ? 'text-[clamp(1.6rem,3vw,2.4rem)]' : 'text-[22px]'}`}>{a.title}</h3>
        <p className="text-slate-600 text-[15px] mt-2.5 line-clamp-2">{a.excerpt}</p>
        <p className="text-[13px] font-semibold text-slate-500 mt-4 pt-4 border-t border-slate-100">{a.author} · {a.date}</p>
      </div>
    </Link>
  )
}

export function CategoryCard({ image, title, text, to }: { image: string; title: string; text: string; to: string }) {
  return (
    <Link to={to} className="group relative overflow-hidden rounded-[1.4rem] border border-slate-200/70 aspect-[4/5] sm:aspect-[3/4] block img-zoom">
      <img src={image} alt={title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/15 to-transparent" aria-hidden />
      <div className="absolute bottom-0 p-5 text-white">
        <h3 className="font-display text-[22px]">{title}</h3>
        <p className="text-white/75 text-[14px]">{text}</p>
        <span className="alink alink-light mt-2 text-[14px]">Explore <span className="arr" aria-hidden>→</span></span>
      </div>
    </Link>
  )
}
