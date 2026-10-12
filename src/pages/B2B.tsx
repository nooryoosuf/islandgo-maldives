import { useState } from 'react'
import { Link } from 'react-router-dom'
import { img } from '../data/images'
import { site } from '../config/site'
import { wa } from '../lib/whatsapp'
import { isValidEmail, isValidPhone } from '../lib/utils'
import { track } from '../lib/analytics'
import type { ComponentType } from 'react'
import { Breadcrumbs, CTASection, ImageHero, SectionHeader } from '../components/ui'
import { Faq } from '../components/forms'
import { IconAnchor, IconCheck, IconCompass, IconHome, IconPack } from '../components/icons'

const TRADE_SERVICES = ['Holiday packages', 'Hotels & resorts', 'Speedboat transfers', 'Excursions & experiences']

function TradeForm() {
  const [f, setF] = useState({ agency: '', person: '', email: '', country: '', phone: '', volume: 'Under 50 pax / year', message: '' })
  const [svc, setSvc] = useState<string[]>(['Holiday packages'])
  const [errs, setErrs] = useState<{ agency?: string; person?: string; email?: string; country?: string; phone?: string; message?: string }>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }))

  if (status === 'sent')
    return (
      <div className="rounded-3xl bg-ocean-50 border border-ocean-100 p-8 text-center" role="status">
        <span className="inline-grid place-items-center w-14 h-14 rounded-full bg-ocean-600 text-white"><IconCheck className="w-7 h-7" /></span>
        <h3 className="font-display text-2xl text-ink-900 mt-2">Trade enquiry received.</h3>
        <p className="text-slate-600 mt-2">Our trade desk replies within one business day with next steps and net-rate arrangements.</p>
      </div>
    )

  return (
    <form
      noValidate
      aria-label="B2B partnership enquiry form"
      id="b2b-enquire"
      className="card !shadow-none p-6 sm:p-8 grid sm:grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (status === 'sending') return
        const v: typeof errs = {}
        if (f.agency.trim().length < 2) v.agency = 'Please enter your agency name.'
        if (f.person.trim().length < 2) v.person = 'Please enter a contact person.'
        if (!isValidEmail(f.email)) v.email = 'Please enter a valid business email.'
        if (f.country.trim().length < 2) v.country = 'Please enter your country / market.'
        if (!isValidPhone(f.phone)) v.phone = 'Please enter a valid number (or leave blank).'
        if (f.message.trim().length < 10) v.message = 'Tell us about your needs (10+ characters).'
        setErrs(v)
        if (Object.keys(v).length) return
        setStatus('sending')
        setTimeout(() => {
          track('enquiry_submit', { kind: 'b2b' })
          setStatus('sent')
          window.scrollTo(0, 0)
        }, 900)
      }}
    >
      <div className="sm:col-span-2">
        <h3 className="font-display text-2xl text-ink-900">Request net rates</h3>
        <p className="text-slate-500 text-[14.5px] mt-1">No fees to register interest — tell us what you sell and we respond with terms.</p>
      </div>
      <div><label className="label" htmlFor="b-agency">Agency / company *</label><input id="b-agency" className="input" placeholder="Worldwide Travel Ltd" value={f.agency} onChange={set('agency')} aria-invalid={!!errs.agency} />{errs.agency && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.agency}</p>}</div>
      <div><label className="label" htmlFor="b-person">Contact person *</label><input id="b-person" className="input" placeholder="Full name" value={f.person} onChange={set('person')} aria-invalid={!!errs.person} autoComplete="name" />{errs.person && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.person}</p>}</div>
      <div><label className="label" htmlFor="b-email">Business email *</label><input id="b-email" type="email" className="input" placeholder="trade@agency.com" value={f.email} onChange={set('email')} aria-invalid={!!errs.email} autoComplete="email" />{errs.email && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.email}</p>}</div>
      <div><label className="label" htmlFor="b-country">Country / market *</label><input id="b-country" className="input" placeholder="e.g. Germany" value={f.country} onChange={set('country')} aria-invalid={!!errs.country} />{errs.country && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.country}</p>}</div>
      <div><label className="label" htmlFor="b-phone">WhatsApp / phone</label><input id="b-phone" className="input" placeholder="+49 …" value={f.phone} onChange={set('phone')} aria-invalid={!!errs.phone} autoComplete="tel" />{errs.phone && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.phone}</p>}</div>
      <div><label className="label" htmlFor="b-volume">Annual Maldives volume</label>
        <select id="b-volume" className="input" value={f.volume} onChange={set('volume')}>
          <option>Under 50 pax / year</option><option>50–200 pax / year</option><option>200+ pax / year</option><option>Just exploring</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <span className="label" id="b-svc">Services needed</span>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="b-svc">
          {TRADE_SERVICES.map((s) => (
            <label key={s} className="chip bg-slate-50 border border-slate-200 cursor-pointer has-[:checked]:bg-ocean-600 has-[:checked]:text-white has-[:checked]:border-ocean-600">
              <input type="checkbox" className="sr-only" checked={svc.includes(s)} onChange={() => setSvc((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))} />{s}
            </label>
          ))}
        </div>
      </div>
      <div className="sm:col-span-2"><label className="label" htmlFor="b-msg">About your needs *</label><textarea id="b-msg" rows={4} className="input" placeholder="Markets, travel style, season, group sizes…" value={f.message} onChange={set('message')} aria-invalid={!!errs.message} />{errs.message && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.message}</p>}</div>
      <button className="btn-primary sm:col-span-2 !py-4" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send trade enquiry →'}</button>
    </form>
  )
}

export function B2B() {
  return (
    <main>
      <ImageHero
        image={img.beachBoat}
        kicker="Travel Trade · B2B Partners"
        title="Partner with IslandGo MV."
        text="Maldives ground services for international travel agents and tour operators — packages, hotels, transfers and excursions with honest net rates."
      >
        <a href="#b2b-enquire" className="btn-primary">Request net rates</a>
      </ImageHero>
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'B2B Partners' }]} /></div>

      <section className="container-x py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="kicker mb-3">Who we work with</p>
          <h2 className="display-xl">Your local team in the Maldives.</h2>
          <div className="mt-4 space-y-4 text-[16.5px] text-slate-700 leading-relaxed">
            <p>We act as the Maldives ground partner for overseas agencies: real supplier relationships around North Malé Atoll, honest advice on seasons and transfers, and quotes your clients can trust.</p>
            <p>Tell us your markets and volumes — we respond with net-rate arrangements, commission terms and booking procedures agreed per partnership. No hidden costs, no surprises for your clients.</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Net rates on request', 'Unbranded quotes available', 'Malé-based operations', 'Reply within 1 business day'].map((t) => (
              <span key={t} className="chip bg-ocean-50 text-ocean-800">✓ {t}</span>
            ))}
          </div>
        </div>
        <img src={img.beachAerial} alt="Turquoise lagoon and sandbank from above" loading="lazy" className="rounded-[2rem] w-full aspect-[4/3] object-cover border border-slate-200" />
      </section>

      <section className="bg-sand-50/70 border-y border-slate-200/70">
        <div className="container-x section-pad">
          <SectionHeader kicker="Trade services" title="What we handle for partners" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              [IconPack, 'Packages for resale', 'Honeymoon, family, luxury and budget itineraries priced for your market.'],
              [IconHome, 'Hotels & resorts', 'Contracted guesthouses plus resort allocations around North Malé.'],
              [IconAnchor, 'Transfers', 'Speedboat coordination matched to your clients’ flights.'],
              [IconCompass, 'Excursions', 'Sandbanks, snorkelling safaris, cruises and fishing nights.'],
            ] as [ComponentType<{ className?: string }>, string, string][]).map(([Icon, t, d]) => (
              <div key={t} className="rounded-3xl bg-white border border-slate-200 p-6">
                <span className="inline-grid place-items-center w-11 h-11 rounded-2xl bg-ocean-50 text-ocean-700"><Icon className="w-6 h-6" /></span>
                <p className="font-bold text-ink-900 mt-3">{t}</p>
                <p className="text-slate-600 text-[14.5px] mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-pad">
        <SectionHeader kicker="How partnering works" title="Simple, in three steps" />
        <ol className="grid sm:grid-cols-3 gap-4 m-0 p-0 list-none">
          {[
            ['Share your needs', 'Markets, volumes, travel style and season — two minutes in the form below.'],
            ['Get net-rate terms', 'A tailored proposal with rates, commission and booking procedures.'],
            ['Confirm & operate', 'Your clients travel; our Malé team handles the ground operation.'],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-3xl border border-slate-200 p-6">
              <p className="font-display text-lg text-slate-300" aria-hidden>{String(i + 1).padStart(2, '0')}</p>
              <p className="font-bold text-ink-900 text-[17px] mt-1">{t}</p>
              <p className="text-slate-600 text-[14.5px] mt-1">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x pb-16 sm:pb-20 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <TradeForm />
        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="card !shadow-none p-6">
            <p className="font-bold text-ink-900">Trade desk</p>
            <p className="text-slate-600 text-[14.5px] mt-2">Prefer email or chat?<br />
              <a className="font-bold text-ocean-700" href={`mailto:${site.contact.email}`}>{site.contact.email}</a><br />
              <a className="font-bold text-ocean-700" href={wa.general()}>{site.contact.whatsappDisplay} (WhatsApp)</a>
            </p>
            <p className="text-slate-500 text-[13.5px] mt-3">Commission and payment terms are agreed per partnership and confirmed in writing — never assumed.</p>
          </div>
          <div className="card !shadow-none p-6">
            <p className="font-bold text-ink-900">Planning a FAM trip?</p>
            <p className="text-slate-500 text-[14px] mt-1">Mention it in your enquiry — we arrange inspection rates where our partners offer them.</p>
          </div>
        </aside>
      </section>

      <section className="container-x pb-16 sm:pb-20 max-w-3xl">
        <SectionHeader kicker="Trade FAQs" title="Good to know" />
        <Faq
          faqs={[
            { q: 'How do net rates work?', a: 'Send your needs and we propose net rates for your market and volume, with commission handled transparently and confirmed per partnership.' },
            { q: 'How fast do you respond?', a: 'Trade enquiries get priority — within one business day, usually much faster on WhatsApp.' },
            { q: 'Can quotes be unbranded?', a: 'Yes — ask and we will prepare client-ready quotes without our branding.' },
            { q: 'Do you require commitments or deposits to start?', a: 'No. Registration of interest is free; payment and cancellation terms are agreed per booking in writing.' },
          ]}
        />
        <p className="text-center mt-8"><Link to="/contact" className="alink text-[15px]">Prefer general contact? <span className="arr" aria-hidden>→</span></Link></p>
      </section>

      <CTASection image={img.sunsetBeach} title="Let's sell the Maldives together." text="One enquiry starts the partnership — net rates, honest advice, reliable ground handling." />
    </main>
  )
}
