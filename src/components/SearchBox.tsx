// Header live search: instant content hits as you type (debounce-free —
// the index is tiny and in-memory), full keyboard support, accessible
// combobox pattern. Submitting falls back to the /search results page.

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchContent } from '../lib/search'
import { track } from '../lib/analytics'

export function SearchBox({ solid }: { solid: boolean }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const nav = useNavigate()

  const hits = q.trim().length >= 2 ? searchContent(q.trim(), 7) : []
  const show = open && hits.length > 0

  const go = (to: string) => {
    track('search', { q: q.trim(), to })
    setOpen(false)
    setQ('')
    nav(to)
  }

  return (
    <form
      role="search"
      aria-label="Site search"
      className="relative hidden xl:block"
      onSubmit={(e) => {
        e.preventDefault()
        if (!q.trim()) return
        go(hits[0]?.to ?? `/search?q=${encodeURIComponent(q.trim())}`)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <input
        role="combobox"
        aria-expanded={show}
        aria-controls="site-search-list"
        aria-activedescendant={show ? `search-opt-${active}` : undefined}
        aria-autocomplete="list"
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && hits.length) {
            e.preventDefault()
            setActive((a) => (a + 1) % hits.length)
          } else if (e.key === 'ArrowUp' && hits.length) {
            e.preventDefault()
            setActive((a) => (a - 1 + hits.length) % hits.length)
          } else if (e.key === 'Escape') {
            setOpen(false)
          }
        }}
        placeholder="Search mantas, surf…"
        aria-label="Search the site"
        autoComplete="off"
        className={`w-44 focus:w-64 transition-all rounded-full px-4 py-2 text-sm outline-none border ${
          solid
            ? 'border-slate-200 focus:border-ocean-500 bg-white'
            : 'border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white/60'
        }`}
      />
      {show && (
        <div id="site-search-list" role="listbox" aria-label="Search suggestions" className="absolute right-0 top-full mt-2 w-[22rem] card !rounded-2xl shadow-soft p-2 bg-white z-50">
          {hits.map((h, i) => (
            <Link
              key={h.to}
              id={`search-opt-${i}`}
              role="option"
              aria-selected={i === active}
              to={h.to}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(h.to)}
              onMouseEnter={() => setActive(i)}
              className={`flex items-center gap-3 rounded-xl p-2 ${i === active ? 'bg-ocean-50' : ''}`}
            >
              <img src={h.image} alt="" aria-hidden loading="lazy" className="w-11 h-11 rounded-lg object-cover shrink-0" />
              <span className="min-w-0">
                <span className="chip bg-ocean-50 text-ocean-700 !text-[10.5px] !py-0.5">{h.kind}</span>
                <span className="block font-bold text-ink-900 text-[14px] truncate">{h.title}</span>
                <span className="block text-slate-500 text-[12.5px] truncate">{h.sub}</span>
              </span>
            </Link>
          ))}
          <button
            type="submit"
            onMouseDown={(e) => e.preventDefault()}
            className="w-full text-left px-3 py-2.5 text-[13.5px] font-bold text-ocean-700 hover:bg-ocean-50 rounded-xl"
          >
            View all results for “{q.trim()}” →
          </button>
        </div>
      )}
    </form>
  )
}
