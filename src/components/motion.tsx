// Dependency-free Aceternity-style interaction primitives.
// Text-generate reveal, scroll reveal, pointer spotlight, marquee,
// subtle hero parallax and magnetic drift — no animation libraries.
// All respect prefers-reduced-motion and touch devices.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

// ---------- Scroll reveal (fade-rise once in view) ----------
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) {
      setVis(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVis(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ '--rd': `${delay}ms` } as CSSProperties} className={`reveal${vis ? ' is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

// ---------- Text-generate effect: word-by-word rise on mount ----------
export function Words({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span className={`words ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="w" style={{ '--i': i, '--wd': `${delay}ms` } as CSSProperties}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

// ---------- Spotlight: pointer-tracked radial sheen over imagery ----------
export function Spot({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || prefersReduced() || isTouch()) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={`spot ${className}`}>
      {children}
    </div>
  )
}

// ---------- Infinite marquee (CSS-driven, pauses on hover) ----------
export function Marquee({ children, speed = 42, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div className="marquee-track" style={{ '--speed': `${speed}s` } as CSSProperties}>
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
      </div>
    </div>
  )
}

// ---------- Subtle hero parallax (translate only, rAF-throttled) ----------
export function HeroParallax({ children, className = '', drift = 0.18 }: { children: ReactNode; className?: string; drift?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (prefersReduced()) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const y = Math.min(window.scrollY, window.innerHeight * 1.2)
        if (y < 0) return
        el.style.transform = `translateY(${(y * drift).toFixed(1)}px) scale(1.1)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [drift])
  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={{ transform: 'scale(1.1)' }}>
      {children}
    </div>
  )
}

// ---------- Magnetic drift for primary CTAs (lite, pointer only) ----------
export function Magnetic({ children, className = '', strength = 7 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || prefersReduced() || isTouch()) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2 * strength
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2 * strength
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`inline-block transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  )
}
