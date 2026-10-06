import { useState } from 'react'
import { isValidEmail, isValidPhone, sanitizeInput } from '../lib/utils'
import { track } from '../lib/analytics'

// ---------- FilterBar (simple, useful; query + one-tap chips) ----------
export function FilterBar({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[]; placeholder: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        type="search"
        className="input sm:max-w-sm"
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Quick filters">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value === value ? '' : o.value)}
            className={`rounded-full px-4 py-2 text-[14px] font-bold border transition ${value === o.value ? 'bg-ocean-600 text-white border-ocean-600' : 'bg-white text-ink-700 border-slate-200 hover:border-ocean-300'}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------- FAQ ----------
export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  if (!faqs.length) return null
  return (
    <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white overflow-hidden">
      {faqs.map((f, i) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="w-full text-left px-5 py-4 font-bold text-ink-900 text-[15.5px] flex justify-between gap-4">
            {f.q}<span className="text-ocean-600" aria-hidden>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="px-5 pb-5 text-slate-600 text-[15px] leading-relaxed">{f.a}</p>}
        </div>
      ))}
    </div>
  )
}

// ---------- Shared validated enquiry form ----------
interface Fields {
  name: string
  email: string
  phone: string
  dates: string
  message: string
}

const EMPTY: Fields = { name: '', email: '', phone: '', dates: '', message: '' }

function validate(f: Fields) {
  const errs: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) errs.name = 'Please enter your name.'
  if (!isValidEmail(f.email)) errs.email = 'Please enter a valid email address.'
  if (!isValidPhone(f.phone)) errs.phone = 'Please enter a valid phone/WhatsApp number (or leave blank).'
  if (f.message.trim().length < 10) errs.message = 'Tell us a little more (10+ characters) so we can help.'
  return errs
}

export function EnquiryForm({ context }: { context: string }) {
  const [f, setF] = useState<Fields>({ ...EMPTY, message: '' })
  const [errs, setErrs] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }))

  if (status === 'sent')
    return (
      <div className="rounded-3xl bg-ocean-50 border border-ocean-100 p-8 text-center" role="status">
        <p className="text-4xl" aria-hidden>☀</p>
        <h3 className="font-display text-2xl text-ink-900 mt-2">Thanks — enquiry received!</h3>
        <p className="text-slate-600 mt-2">Our Malé team replies within a few hours on email + WhatsApp. Reference: <b>{sanitizeInput(context, 80)}</b></p>
        <a href="https://wa.me/9607500000" className="btn-ocean mt-5">Continue on WhatsApp</a>
      </div>
    )

  return (
    <form
      className="card !shadow-none p-6 sm:p-8"
      noValidate
      aria-label={`Enquire about ${context}`}
      onSubmit={(e) => {
        e.preventDefault()
        if (status === 'sending') return // prevent duplicate submissions
        const v = validate(f)
        setErrs(v)
        if (Object.keys(v).length > 0) return
        setStatus('sending')
        // Simulated submit (no backend yet): validate → sanitize → success.
        // Replace with fetch() to an endpoint later; failure path already handled.
        setTimeout(() => {
          try {
            void sanitizeInput(f.name)
            track('enquiry_submit', { context })
            setStatus('sent')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } catch {
            setStatus('failed')
          }
        }, 900)
      }}
    >
      <h3 className="font-display text-2xl text-ink-900">Ask about this {context}</h3>
      <p className="text-slate-500 text-[14.5px] mt-1">No payment, no fake availability — a real quote from our team.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="label" htmlFor={`name-${context}`}>Name *</label>
          <input id={`name-${context}`} className="input" placeholder="Your name" value={f.name} onChange={set('name')} aria-invalid={!!errs.name} aria-describedby={errs.name ? `e-name-${context}` : undefined} autoComplete="name" />
          {errs.name && <p id={`e-name-${context}`} className="text-red-600 text-[13px] mt-1" role="alert">{errs.name}</p>}
        </div>
        <div>
          <label className="label" htmlFor={`email-${context}`}>Email *</label>
          <input id={`email-${context}`} type="email" className="input" placeholder="you@email.com" value={f.email} onChange={set('email')} aria-invalid={!!errs.email} autoComplete="email" />
          {errs.email && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.email}</p>}
        </div>
        <div>
          <label className="label" htmlFor={`phone-${context}`}>WhatsApp / phone</label>
          <input id={`phone-${context}`} className="input" placeholder="+44 ..." value={f.phone} onChange={set('phone')} aria-invalid={!!errs.phone} autoComplete="tel" />
          {errs.phone && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.phone}</p>}
        </div>
        <div>
          <label className="label" htmlFor={`dates-${context}`}>Travel dates</label>
          <input id={`dates-${context}`} className="input" placeholder="e.g. 12–20 Feb 2027" value={f.dates} onChange={set('dates')} />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor={`msg-${context}`}>Message *</label>
          <textarea id={`msg-${context}`} rows={4} className="input" placeholder={`Hi! We'd love to know more about ${context} for 2 adults...`} value={f.message} onChange={set('message')} aria-invalid={!!errs.message} />
          {errs.message && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.message}</p>}
        </div>
      </div>
      {status === 'failed' && <p className="text-red-600 text-[14px] mt-3" role="alert">Something went wrong sending. Please try again — or message us on WhatsApp.</p>}
      <button className="btn-primary w-full mt-5" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      <p className="text-center text-[13px] text-slate-400 mt-3">Prefer chat? <a className="font-bold text-ocean-700" href="https://wa.me/9607500000">WhatsApp +960 750-0000</a></p>
    </form>
  )
}
