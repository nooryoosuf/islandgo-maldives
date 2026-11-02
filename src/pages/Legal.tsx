import { Link } from 'react-router-dom'
import { Breadcrumbs, CTASection, ImageHero } from '../components/ui'
import { img } from '../data/images'

function Shell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main>
      <ImageHero image={img.beachAerial} kicker="Legal" title={title} text="Clear, transparent terms and privacy commitments from our Malé team." />
      <div className="container-x pt-6"><Breadcrumbs items={[{ label: title }]} /></div>
      <section className="container-x py-10 max-w-3xl">
        <p className="text-[13px] text-slate-400 mt-2">Last updated: {updated}</p>
        <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-slate-700">{children}</div>
        <div className="flex gap-3 mt-8">
          <Link to="/contact" className="btn-ocean">Contact us</Link>
          <Link to="/" className="btn-ghost">Back home</Link>
        </div>
      </section>
      <CTASection image={img.sunsetBeach} title="Questions about your booking or privacy?" text="Message us anytime — our local team replies promptly." />
    </main>
  )
}

export function Privacy() {
  return (
    <Shell title="Privacy Policy" updated="October 2026">
      <h2 className="h-display text-2xl">What we collect</h2>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>Enquiry details you send us (name, email, phone/WhatsApp number, travel dates, hotel and destination preferences) — used solely to prepare your personalized itinerary and quote.</li>
        <li>Basic anonymous visit counts and campaign referrals — to understand site performance and service demand.</li>
      </ul>
      <h2 className="h-display text-2xl">How we protect your information</h2>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>No selling or renting your personal data to third parties.</li>
        <li>No payment card data is captured or processed on this website.</li>
        <li>Direct communication remains strictly between you and our verified Maldives travel team.</li>
      </ul>
      <h2 className="h-display text-2xl">Your rights</h2>
      <p>You may contact us anytime at <a className="font-bold text-ocean-700" href="mailto:islandgomvtraveltours@gmail.com">islandgomvtraveltours@gmail.com</a> to view, update, or request the complete deletion of your enquiry data.</p>
    </Shell>
  )
}

export function Terms() {
  return (
    <Shell title="Terms & Conditions" updated="October 2026">
      <h2 className="h-display text-2xl">Enquiries & Travel Planning</h2>
      <p>IslandGo Maldives provides discovery, itinerary curation, and reservation arrangements for Maldives holidays. Browsing the website and submitting an enquiry is free of charge. An enquiry does not constitute a confirmed reservation until availability is verified and you approve the formal quote in writing.</p>
      <h2 className="h-display text-2xl">Rates & Currency</h2>
      <p>All prices displayed are indicative starting rates in US Dollars (USD), based on twin-share occupancy unless otherwise noted. Final quotes specify all inclusions, government taxes, service charges, Green Tax, and transfer arrangements.</p>
      <h2 className="h-display text-2xl">Bookings & Confirmations</h2>
      <p>A confirmed booking exists only after receipt of your written acceptance and required deposit or payment according to the supplier’s policies. Official hotel confirmation vouchers and speedboat transfer schedules are issued promptly upon confirmation.</p>
      <h2 className="h-display text-2xl">Cancellations & Modifications</h2>
      <p>Cancellation and amendment timelines vary according to hotel season and excursion operators. All terms are clearly detailed in your written quote before payment. If your plans change, notify us immediately and our team will work to achieve the most favorable outcome with our partners.</p>
      <h2 className="h-display text-2xl">Marine Life & Weather</h2>
      <p>Ocean excursions follow respectful eco-guidelines and weather safety protocols. Sightings of marine wildlife (mantas, whale sharks, dolphins) depend on natural ocean conditions and cannot be unconditionally guaranteed.</p>
    </Shell>
  )
}

export function Cookies() {
  return (
    <Shell title="Cookie Policy" updated="October 2026">
      <h2 className="h-display text-2xl">Essential Storage</h2>
      <p>We use minimal local browser storage solely to preserve essential site functionality and remember your preference settings.</p>
      <h2 className="h-display text-2xl">Analytics & Campaign Attribution</h2>
      <p>We use privacy-conscious analytics and URL campaign tracking to measure aggregate traffic and visitor origins. You may manage or clear your preferences at any time through your browser settings.</p>
    </Shell>
  )
}
