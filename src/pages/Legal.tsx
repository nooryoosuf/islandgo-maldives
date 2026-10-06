import { Link } from 'react-router-dom'
import { Breadcrumbs, CTASection, ImageHero } from '../components/ui'
import { img } from '../data/images'

function Shell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main>
      <ImageHero image={img.beachAerial} kicker="Legal · Draft placeholder" title={title} text="Plain-English summary. Final legal copy to be confirmed with the client before launch." />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: title }]} /></div>
      <section className="container-x py-10 max-w-3xl">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-[14.5px] text-amber-900" role="note">
          <b>Draft placeholder:</b> this page is a starting structure, not approved legal advice. Replace with counsel-reviewed copy for {updated} launch.
        </div>
        <p className="text-[13px] text-slate-400 mt-4">Last updated: {updated}</p>
        <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-slate-700">{children}</div>
        <div className="flex gap-3 mt-8">
          <Link to="/contact" className="btn-ocean">Contact us</Link>
          <Link to="/" className="btn-ghost">Back home</Link>
        </div>
      </section>
      <CTASection image={img.sunsetBeach} title="Questions about your data?" text="Message us — a human replies." />
    </main>
  )
}

export function Privacy() {
  return (
    <Shell title="Privacy Policy" updated="October 2026">
      <h2 className="h-display text-2xl">What we collect</h2>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>Enquiry details you send us (name, email, phone, dates, preferences) — used only to prepare your quote.</li>
        <li>Basic anonymous visit counts — only if you accept analytics cookies.</li>
      </ul>
      <h2 className="h-display text-2xl">What we never do</h2>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>No selling data. No invasive trackers. No fake accounts created from enquiries.</li>
        <li>No payment data is collected on this website (there is no checkout).</li>
      </ul>
      <h2 className="h-display text-2xl">Your rights</h2>
      <p>Ask us anytime at <a className="font-bold text-ocean-700" href="mailto:hello@islandgo.mv">hello@islandgo.mv</a> to view, correct or delete your enquiry data.</p>
    </Shell>
  )
}

export function Terms() {
  return (
    <Shell title="Terms & Conditions" updated="October 2026">
      <h2 className="h-display text-2xl">What this website is</h2>
      <p>IslandGo Maldives is a travel-discovery and enquiry service. Browsing is free; submitting an enquiry asks our team for availability and a quote — it does not create a booking until you confirm in writing.</p>
      <h2 className="h-display text-2xl">Prices & availability</h2>
      <p>All “from” prices are indicative starting points in USD, excluding international flights unless stated. Final quotes confirm inclusions, transfers, taxes and validity dates.</p>
      <h2 className="h-display text-2xl">Content</h2>
      <p>Photography includes high-quality placeholders until agency shoots replace them. Marine-life sightings (mantas, whale sharks, dolphins) are never guaranteed — we operate ethical, no-chase policies.</p>
    </Shell>
  )
}

export function Cookies() {
  return (
    <Shell title="Cookie Policy" updated="October 2026">
      <h2 className="h-display text-2xl">Essential</h2>
      <p>We use a single local-storage flag to remember your cookie choice. No consent wall blocks browsing.</p>
      <h2 className="h-display text-2xl">Analytics (optional)</h2>
      <p>Only after you click “Accept”, we count anonymous page views to improve the site. Decline and nothing loads. Change your mind anytime by clearing site data in your browser.</p>
    </Shell>
  )
}
