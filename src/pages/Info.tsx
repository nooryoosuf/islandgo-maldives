import { useState } from 'react'
import { Link } from 'react-router-dom'
import { offers } from '../data/articles'
import { destinations } from '../data/destinations'
import { img } from '../data/images'
import { site } from '../config/site'
import { wa } from '../lib/whatsapp'
import { isValidEmail, isValidPhone, sanitizeInput } from '../lib/utils'
import { track } from '../lib/analytics'
import { Breadcrumbs, CTASection, ImageHero, SectionHeader } from '../components/ui'

export function OffersPage() {
  return (
    <main>
      <ImageHero image={img.sunsetBeach} kicker="Offers · Seasonal value" title="Offers" text="Simple, real promotions — no blackout mazes. Mention the code in your enquiry." />
      <section className="container-x section-pad">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((o) => (
            <div key={o.slug} className="card img-zoom group">
              <div className="relative"><img src={o.image} alt={o.title} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                <span className="absolute top-3 left-3 chip bg-sunset-500 text-white">{o.tag}</span></div>
              <div className="p-5">
                <h3 className="font-display text-[21px] text-ink-900">{o.title}</h3>
                <p className="text-slate-600 text-[14.5px] mt-1.5">{o.description}</p>
                <p className="text-[13px] font-bold text-ocean-700 mt-2">{o.validUntil}{o.code ? ` · Code ${o.code}` : ''}</p>
                <Link to="/plan-trip" className="btn-ocean w-full mt-4 !py-2.5">Enquire with this offer</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection image={img.overwater} title="Want the next deal first?" text="Enquire once and we will flag matching offers before you book flights." />
    </main>
  )
}

export function About() {
  return (
    <main>
      <ImageHero image={img.islandLife} kicker="About · Malé-based travel studio" title="We plan Maldives trips we’d take ourselves." text="IslandGo Maldives is a small, new travel studio with a simple job: match you to the right island, at the right season, at a fair price." />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: 'About' }]} /></div>
      <section className="container-x py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-sunset-600">Who we are</p>
          <h2 className="h-display text-3xl sm:text-4xl mt-2">New brand, local roots.</h2>
          <div className="mt-4 space-y-4 text-[16.5px] text-slate-700 leading-relaxed">
            <p>We started IslandGo because planning the Maldives felt harder than it should be — identical resort photos, hidden transfer costs, and “book now” buttons with no human behind them.</p>
            <p>So we do it differently: <b>atoll first, island second, star-rating last.</b> We check tides, seasons and transfer times before we quote. If a cheaper local island fits you better than a resort, we will say so.</p>
            <p>Right now we are a discovery + enquiry studio — no fake booking engine. You explore, you message us, we confirm real availability and price in writing. Booking, payments and dashboards come later, built properly.</p>
          </div>
          <div className="flex gap-3 mt-6"><Link to="/plan-trip" className="btn-primary">Plan Your Trip</Link><Link to="/contact" className="btn-ghost">Contact</Link></div>
        </div>
        <img src={img.couple} alt="Travellers on a Maldivian beach" loading="lazy" className="rounded-[2rem] w-full aspect-[4/3] object-cover border border-slate-200" />
      </section>
      <section className="bg-sand-50 border-y border-slate-100"><div className="container-x section-pad">
        <SectionHeader kicker="How we work" title="What makes us different" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[['◍', 'Right island first', 'Season + transfer + vibe before price comparison.'], ['✆', 'Humans on WhatsApp', 'Same person from first message to welcome briefing.'], ['◎', 'Resorts + local islands', 'We sell both, so advice stays neutral.'], ['♥', 'No pressure', 'Quotes valid 7 days. No countdown timers, ever.']].map(([i, t, d]) => (
            <div key={t} className="rounded-3xl bg-white border border-slate-200 p-6"><p className="text-2xl">{i}</p><p className="font-bold text-ink-900 mt-2">{t}</p><p className="text-slate-600 text-[14.5px] mt-1">{d}</p></div>
          ))}
        </div>
      </div></section>
      <section className="container-x section-pad">
        <SectionHeader kicker="Where we go" title="Atolls we cover best" link="/destinations" />
        <div className="grid sm:grid-cols-3 gap-5">
          {destinations.slice(0, 3).map((d) => (
            <Link key={d.slug} to={`/destinations/${d.slug}`} className="card img-zoom block"><img src={d.cardImage} alt={d.name} loading="lazy" className="w-full aspect-[16/10] object-cover" /><div className="p-5"><h3 className="font-display text-xl text-ink-900">{d.name}</h3><p className="text-slate-500 text-sm">{d.tagline}</p></div></Link>
          ))}
        </div>
      </section>
      <CTASection image={img.beachAerial} title="Meet us over WhatsApp first." text="Two minutes of chat beats two hours of tabs." />
    </main>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', topic: 'General question', message: '' })
  const [errs, setErrs] = useState<{ name?: string; email?: string; message?: string }>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  return (
    <main>
      <ImageHero image={img.beachBoat} kicker="Contact · Humans reply" title="Talk to us." text="WhatsApp is fastest. Email works too. We reply within a few hours, Malé time (GMT+5)." />
      <section className="container-x section-pad grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <div className="space-y-4">
          {[
            ['WhatsApp (fastest)', site.contact.whatsappDisplay, wa.general()],
            ['Email', site.contact.email, `mailto:${site.contact.email}`],
            ['Studio', site.contact.address, undefined],
            ['Hours', site.contact.hours, undefined],
          ].map(([k, v, href]) => (
            <div key={k} className="card !shadow-none p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{k}</p>
              {href ? <a href={href as string} className="font-bold text-ocean-700 text-[17px]">{v}</a> : <p className="font-bold text-ink-900 text-[17px]">{v}</p>}
            </div>
          ))}
          <div className="rounded-3xl overflow-hidden border border-slate-200"><img src={img.maleCity} alt="Malé island skyline at golden hour" loading="lazy" className="w-full aspect-[16/9] object-cover" /></div>
        </div>
        <div className="card !shadow-none p-6 sm:p-8">
          {status === 'sent' ? (
            <div className="text-center py-10" role="status"><p className="text-4xl" aria-hidden>☀</p><h2 className="font-display text-2xl text-ink-900 mt-2">Message sent!</h2><p className="text-slate-500">We will reply shortly on email + WhatsApp.</p></div>
          ) : (
            <form
              noValidate
              aria-label="Contact form"
              className="grid sm:grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                if (status === 'sending') return
                const v: typeof errs = {}
                if (f.name.trim().length < 2) v.name = 'Please enter your name.'
                if (!isValidEmail(f.email)) v.email = 'Please enter a valid email address.'
                if (f.message.trim().length < 10) v.message = 'Please add a little detail (10+ characters).'
                setErrs(v)
                if (Object.keys(v).length) return
                setStatus('sending')
                setTimeout(() => {
                  track('contact_submit', {})
                  setStatus('sent')
                }, 800)
              }}
            >
              <div><label className="label" htmlFor="c-name">Name *</label><input id="c-name" className="input" placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.name}</p>}</div>
              <div><label className="label" htmlFor="c-email">Email *</label><input id="c-email" type="email" className="input" placeholder="you@email.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" aria-invalid={!!errs.email} />{errs.email && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.email}</p>}</div>
              <div className="sm:col-span-2"><label className="label" htmlFor="c-topic">Topic</label><select id="c-topic" className="input" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}><option>General question</option><option>Trip planning</option><option>Resort question</option><option>Partnership</option></select></div>
              <div className="sm:col-span-2"><label className="label" htmlFor="c-msg">Message *</label><textarea id="c-msg" rows={5} className="input" placeholder="Hi IslandGo…" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-invalid={!!errs.message} />{errs.message && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.message}</p>}</div>
              {status === 'failed' && <p className="sm:col-span-2 text-red-600 text-[14px]" role="alert">Couldn’t send — please try again or WhatsApp us.</p>}
              <button className="btn-primary sm:col-span-2" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export function PlanTrip() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const prefill = params.get('destination') || params.get('stay') || params.get('package') || params.get('experience') || ''
  const [f, setF] = useState({ name: '', email: '', phone: '', dates: '', pref: prefill, notes: '' })
  const [errs, setErrs] = useState<{ name?: string; email?: string; phone?: string; notes?: string }>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <main className="container-x section-pad max-w-2xl text-center">
        <p className="text-6xl" aria-hidden>☀</p>
        <h1 className="h-display text-4xl mt-4">Shukriyā! Enquiry sent.</h1>
        <p className="text-slate-600 mt-3">Our Malé team will reply within a few hours with 2–3 honest options. Want it faster?</p>
        <a href={wa.general()} className="btn-primary mt-6">Continue on WhatsApp</a>
        <p className="mt-4"><Link to="/" className="font-bold text-ocean-700">← Back home</Link></p>
      </main>
    )
  return (
    <main>
      <ImageHero image={img.heroBeachWide} kicker="Plan your trip · Free, friendly, no payment" title="Tell us your dream trip." text="Two minutes now saves hours later. We reply with matched islands + clear prices." />
      <section className="container-x section-pad grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <form
          noValidate
          aria-label="Plan your trip enquiry form"
          className="card !shadow-none p-6 sm:p-8 grid sm:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (sending) return
            const v: typeof errs = {}
            if (f.name.trim().length < 2) v.name = 'Please enter your name.'
            if (!isValidEmail(f.email)) v.email = 'Please enter a valid email address.'
            if (!isValidPhone(f.phone)) v.phone = 'Please enter a valid number (or leave blank).'
            if (f.notes.trim().length < 10) v.notes = 'Add a little detail (10+ characters) — e.g. honeymoon, quiet reef…'
            setErrs(v)
            if (Object.keys(v).length) return
            setSending(true)
            setTimeout(() => {
              track('enquiry_submit', { kind: 'plan-trip' })
              setSending(false)
              setSent(true)
              window.scrollTo(0, 0)
            }, 900)
          }}
        >
          <div><label className="label" htmlFor="p-name">Name *</label><input id="p-name" className="input" placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.name}</p>}</div>
          <div><label className="label" htmlFor="p-email">Email *</label><input id="p-email" type="email" className="input" placeholder="you@email.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" aria-invalid={!!errs.email} />{errs.email && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.email}</p>}</div>
          <div><label className="label" htmlFor="p-phone">WhatsApp / phone</label><input id="p-phone" className="input" placeholder="+44 …" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} autoComplete="tel" aria-invalid={!!errs.phone} />{errs.phone && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.phone}</p>}</div>
          <div><label className="label" htmlFor="p-dates">Travel dates</label><input id="p-dates" className="input" placeholder="e.g. 12–20 Feb 2027" value={f.dates} onChange={(e) => setF({ ...f, dates: e.target.value })} /></div>
          <div><label className="label" htmlFor="p-adults">Adults</label><select id="p-adults" className="input" defaultValue="2"><option>2</option><option>1</option><option>3</option><option>4+</option></select></div>
          <div><label className="label" htmlFor="p-kids">Children</label><select id="p-kids" className="input" defaultValue="0"><option>0</option><option>1</option><option>2</option><option>3+</option></select></div>
          <div><label className="label" htmlFor="p-style">Travel style</label><select id="p-style" className="input" defaultValue="Honeymoon"><option>Honeymoon</option><option>Family</option><option>Luxury</option><option>Adventure / diving</option><option>Budget</option><option>Island hopping</option></select></div>
          <div><label className="label" htmlFor="p-budget">Budget per person (excl. flights)</label><select id="p-budget" className="input" defaultValue="$1,000–2,000"><option>Under $1,000</option><option>$1,000–2,000</option><option>$2,000–4,000</option><option>$4,000+</option></select></div>
          <div className="sm:col-span-2"><label className="label" htmlFor="p-pref">Resort / island preference {prefill && <span className="text-ocean-600 normal-case">· prefilled: {sanitizeInput(prefill, 60)}</span>}</label><input id="p-pref" className="input" value={f.pref} onChange={(e) => setF({ ...f, pref: e.target.value })} placeholder="Anywhere you already love?" /></div>
          <div className="sm:col-span-2"><span className="label" id="p-act">Must-do activities</span>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="p-act">{['Diving', 'Snorkelling', 'Surfing', 'Sandbank', 'Dolphins', 'Fishing', 'Culture', 'Spa'].map((a) => <label key={a} className="chip bg-slate-50 border border-slate-200 cursor-pointer has-[:checked]:bg-ocean-600 has-[:checked]:text-white has-[:checked]:border-ocean-600"><input type="checkbox" className="sr-only" />{a}</label>)}</div></div>
          <div className="sm:col-span-2"><label className="label" htmlFor="p-notes">Anything else? *</label><textarea id="p-notes" rows={4} className="input" placeholder="Honeymoon, quiet reef, short boat ride, vegetarian food…" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} aria-invalid={!!errs.notes} />{errs.notes && <p className="text-red-600 text-[13px] mt-1" role="alert">{errs.notes}</p>}</div>
          <button className="btn-primary sm:col-span-2 !py-4 !text-base" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry →'}</button>
          <p className="sm:col-span-2 text-center text-[13px] text-slate-400">No payment · No spam · Reply within hours on email + WhatsApp</p>
        </form>
        <aside className="space-y-4">
          <div className="rounded-3xl overflow-hidden border border-slate-200"><img src={img.couple} alt="Couple walking on a Maldivian beach at sunset" loading="lazy" className="w-full aspect-[4/3] object-cover" /></div>
          <div className="card !shadow-none p-6">
            <p className="font-bold text-ink-900">What happens next?</p>
            <ol className="mt-3 space-y-2.5 text-[15px] text-slate-600">
              <li><b className="text-ink-900">1.</b> We read every word (human, in Malé).</li>
              <li><b className="text-ink-900">2.</b> 2–3 matched islands + honest prices.</li>
              <li><b className="text-ink-900">3.</b> You tweak; we confirm availability in writing.</li>
            </ol>
            <a href={wa.general()} className="btn-ghost w-full mt-4">Skip the form — WhatsApp</a>
          </div>
        </aside>
      </section>
    </main>
  )
}
