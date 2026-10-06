import { Component, type ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent, hasConsent } from '../lib/analytics'

// ---------- Error boundary: never expose technical errors to visitors ----------
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    /* log to provider here if ever added */
  }
  render() {
    if (this.state.failed)
      return (
        <main className="container-x section-pad text-center max-w-xl mx-auto">
          <p className="text-5xl" aria-hidden>◍</p>
          <h1 className="h-display text-4xl mt-4">Something drifted off course.</h1>
          <p className="text-slate-500 mt-3">Please refresh the page — or message us on WhatsApp and we’ll help right away.</p>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={() => window.location.reload()} className="btn-ocean">Refresh page</button>
            <Link to="/" className="btn-ghost">Back home</Link>
          </div>
        </main>
      )
    return this.props.children
  }
}

// ---------- Empty state ----------
export function EmptyState({ title, text, actionTo, actionLabel }: { title: string; text: string; actionTo?: string; actionLabel?: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center" role="status">
      <p className="text-4xl" aria-hidden>◌</p>
      <h3 className="font-display text-2xl text-ink-900 mt-3">{title}</h3>
      <p className="text-slate-500 mt-2 max-w-md mx-auto">{text}</p>
      {actionTo && <Link to={actionTo} className="btn-ghost mt-5">{actionLabel ?? 'Explore instead →'}</Link>}
    </div>
  )
}

// ---------- Skeleton (subtle, not over-animated) ----------
export function CardSkeleton() {
  return (
    <div className="card p-0 overflow-hidden" aria-hidden>
      <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
      <div className="p-5 space-y-2">
        <div className="h-3 w-1/3 bg-slate-100 rounded-full" />
        <div className="h-5 w-3/4 bg-slate-100 rounded-full" />
        <div className="h-3 w-full bg-slate-100 rounded-full" />
      </div>
    </div>
  )
}

// ---------- Responsive SmartImage: right size per slot, lazy below fold ----------
const FALLBACK = 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop'

function sized(src: string, w: number) {
  if (!src.includes('images.unsplash.com')) return src
  const base = src.split('?')[0]
  return `${base}?q=70&w=${w}&auto=format&fit=crop`
}

export function SmartImage({
  src, alt, ratio = 'aspect-[4/3]', eager, width = 1200, className = '',
}: { src: string; alt: string; ratio?: string; eager?: boolean; width?: number; className?: string }) {
  const [failed, setFailed] = useState(false)
  const s = failed ? FALLBACK : src
  return (
    <div className={`overflow-hidden bg-ocean-50 ${ratio} ${className}`}>
      <img
        src={sized(s, Math.min(width, 1200))}
        srcSet={`${sized(s, 640)} 640w, ${sized(s, 960)} 960w, ${sized(s, 1280)} 1280w`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        width={width}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
      />
    </div>
  )
}

// ---------- Cookie / consent banner (analytics loads only after accept) ----------
export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (getConsent() === null) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])
  if (!visible) return null
  const choose = (v: 'accepted' | 'declined') => {
    setConsent(v)
    setVisible(false)
  }
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 card !rounded-2xl p-5" role="dialog" aria-label="Cookie consent">
      <p className="font-bold text-ink-900 text-[15px]">A quick note on cookies 🍪</p>
      <p className="text-slate-600 text-[14px] mt-1">We only use optional analytics cookies to understand visits — after you accept. See our <Link to="/cookies" className="font-bold text-ocean-700">Cookie Policy</Link>.</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => choose('accepted')} className="btn-ocean !py-2 flex-1">Accept</button>
        <button onClick={() => choose('declined')} className="btn-ghost !py-2 flex-1">Decline</button>
      </div>
    </div>
  )
}

// ---------- Skip link + reduced-motion + focus visibility handled in CSS ----------
export function SkipLink() {
  return <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-ocean-950 focus:text-white focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
}

export function usePageView(path: string, label?: string) {
  useEffect(() => {
    if (hasConsent()) return
    void path
    void label
  }, [path, label])
}
