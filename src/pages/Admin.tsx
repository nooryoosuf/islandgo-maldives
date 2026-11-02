import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdminSession, loginAdmin, logoutAdmin, saveNewCredentials } from '../lib/auth'
import { getStoredContent, saveContent, resetContentToDefaults, type WebsiteData } from '../lib/contentStore'
import type { Property, Package, Destination, Experience, Offer } from '../data/types'

export function AdminDashboard() {
  const [session, setSession] = useState(() => getAdminSession())
  const [data, setData] = useState<WebsiteData>(() => getStoredContent())
  const [activeTab, setActiveTab] = useState<'brand' | 'stays' | 'packages' | 'experiences' | 'destinations' | 'offers' | 'backup'>('brand')
  const [toast, setToast] = useState<string | null>(null)

  // Auth state
  const [loginEmail, setLoginEmail] = useState('admin@islandgomv.com')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [remember, setRemember] = useState(true)

  // Password change modal
  const [showPassModal, setShowPassModal] = useState(false)
  const [newPass, setNewPass] = useState('')
  const [passNotice, setPassNotice] = useState('')

  // Modals for editing/creating items
  const [editingStay, setEditingStay] = useState<Property | null>(null)
  const [isNewStay, setIsNewStay] = useState(false)

  const [editingPkg, setEditingPkg] = useState<Package | null>(null)
  const [isNewPkg, setIsNewPkg] = useState(false)

  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [isNewExp, setIsNewExp] = useState(false)

  const [editingDest, setEditingDest] = useState<Destination | null>(null)
  const [isNewDest, setIsNewDest] = useState(false)

  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [isNewOffer, setIsNewOffer] = useState(false)

  const notify = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleSaveData = (updated: WebsiteData) => {
    setData(updated)
    saveContent(updated)
    notify('Changes saved and live!')
  }

  // Handle Login
  if (!session) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setLoginError('')
      const ok = loginAdmin(loginEmail, loginPass, remember)
      if (ok) {
        setSession(getAdminSession())
      } else {
        setLoginError('Invalid email or password.')
      }
    }

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full mb-3">Admin Portal</span>
            <h1 className="font-display text-3xl font-bold text-ink-900">IslandGo Maldives</h1>
            <p className="text-slate-500 text-sm mt-1">Manage website content, stays, and packages</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
              <input
                type="email"
                required
                className="input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@islandgomv.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Password</label>
              <input
                type="password"
                required
                className="input"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded text-ocean-600 focus:ring-0"
                />
                Remember me on this device
              </label>
            </div>
            <button type="submit" className="btn-ocean w-full !py-3.5 mt-2 font-bold">
              Sign In to Dashboard →
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs font-bold text-slate-400 hover:text-ocean-700 transition">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard Main View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3 animate-fade-in">
          <span>✓</span> {toast}
        </div>
      )}

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display font-bold text-xl text-ink-900 tracking-tight">
            IslandGo <span className="text-amber-500 font-semibold text-sm">Dashboard</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Sync Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" target="_blank" className="btn-ghost !py-2 !px-4 text-xs font-bold">
            View Live Site ↗
          </Link>
          <button onClick={() => setShowPassModal(true)} className="btn-ghost !py-2 !px-3 text-xs font-bold">
            Change Password
          </button>
          <button
            onClick={() => {
              logoutAdmin()
              setSession(null)
            }}
            className="px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row container-x py-8 gap-8">
        {/* Navigation Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm space-y-1 sticky top-24">
            {[
              { id: 'brand', label: 'Homepage & Brand', icon: '🏠' },
              { id: 'stays', label: 'Kaani Stays & Hotels', icon: '🏨', badge: data.properties.length },
              { id: 'packages', label: 'Packages & Trips', icon: '🎒', badge: data.packages.length },
              { id: 'experiences', label: 'Tours & Excursions', icon: '🚤', badge: data.experiences.length },
              { id: 'destinations', label: 'Destinations', icon: '🌴', badge: data.destinations.length },
              { id: 'offers', label: 'Special Offers', icon: '🏷️', badge: data.offers.length },
              { id: 'backup', label: 'Backup & JSON', icon: '💾' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                  activeTab === t.id ? 'bg-ocean-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-ink-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>{t.icon}</span> {t.label}
                </span>
                {t.badge !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: BRAND & HOMEPAGE */}
          {activeTab === 'brand' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-ink-900">Homepage & Contact Information</h2>
                <p className="text-slate-500 text-sm mt-1">Changes made here update the homepage hero, headers, and footer in real-time.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="label">Homepage Hero Kicker</label>
                  <input
                    className="input"
                    value={data.brand.hero.kicker}
                    onChange={(e) =>
                      setData({ ...data, brand: { ...data.brand, hero: { ...data.brand.hero, kicker: e.target.value } } })
                    }
                  />
                </div>
                <div>
                  <label className="label">Hero Headline Title</label>
                  <input
                    className="input"
                    value={data.brand.hero.title}
                    onChange={(e) =>
                      setData({ ...data, brand: { ...data.brand, hero: { ...data.brand.hero, title: e.target.value } } })
                    }
                  />
                </div>
                <div>
                  <label className="label">Hero Headline Accent (Gold text)</label>
                  <input
                    className="input"
                    value={data.brand.hero.accent}
                    onChange={(e) =>
                      setData({ ...data, brand: { ...data.brand, hero: { ...data.brand.hero, accent: e.target.value } } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Hero Tagline / Subtitle</label>
                  <input
                    className="input"
                    value={data.brand.hero.subtitle}
                    onChange={(e) =>
                      setData({ ...data, brand: { ...data.brand, hero: { ...data.brand.hero, subtitle: e.target.value } } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Hero Introduction Paragraph</label>
                  <textarea
                    rows={3}
                    className="input"
                    value={data.brand.hero.description}
                    onChange={(e) =>
                      setData({ ...data, brand: { ...data.brand, hero: { ...data.brand.hero, description: e.target.value } } })
                    }
                  />
                </div>
                <div>
                  <label className="label">WhatsApp Number (Display)</label>
                  <input
                    className="input"
                    value={data.brand.whatsappDisplay}
                    onChange={(e) => setData({ ...data, brand: { ...data.brand, whatsappDisplay: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="label">WhatsApp Number (Digits only, e.g. 9607922030)</label>
                  <input
                    className="input"
                    value={data.brand.whatsappNumber}
                    onChange={(e) =>
                      setData({ ...data, brand: { ...data.brand, whatsappNumber: e.target.value.replace(/\D/g, '') } })
                    }
                  />
                </div>
                <div>
                  <label className="label">Contact Email</label>
                  <input
                    type="email"
                    className="input"
                    value={data.brand.email}
                    onChange={(e) => setData({ ...data, brand: { ...data.brand, email: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="label">Operating Hours</label>
                  <input
                    className="input"
                    value={data.brand.hours}
                    onChange={(e) => setData({ ...data, brand: { ...data.brand, hours: e.target.value } })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button onClick={() => handleSaveData(data)} className="btn-ocean !px-8 !py-3.5">
                  Save Live Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STAYS & HOTELS */}
          {activeTab === 'stays' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Kaani Stays & Hotels</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Manage room tiers, rates, photos, and descriptions for all Kaani properties.</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewStay(true)
                    setEditingStay({
                      slug: 'kaani-new-hotel',
                      name: 'Kaani New Hotel',
                      type: 'hotel',
                      destinationSlug: 'maafushi-local-island',
                      location: 'Maafushi · Bikini Beach',
                      rating: '4-star beach hotel',
                      priceHint: 'From $130 / night',
                      description: 'Contemporary beachfront hotel on Maafushi...',
                      highlights: ['Rooftop pool', 'Bikini Beach front', 'Spa and excursions'],
                      accommodation: [{ name: 'Deluxe Ocean View', detail: 'Private balcony · from $130' }],
                      dining: [{ name: 'Beach Restaurant', detail: 'Buffet breakfast included' }],
                      experiences: ['sandbank-picnic', 'sunset-cruise'],
                      transfers: 'Speedboat approx. 30–35 min from Velana International Airport.',
                      facilities: ['Bikini Beach access', 'Free Wi-Fi', 'Spa'],
                      heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop',
                      cardImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop',
                      gallery: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop'],
                      faqs: [{ q: 'Is breakfast included?', a: 'Yes, daily breakfast buffet is included.' }],
                      featured: true,
                    })
                  }}
                  className="btn-primary !py-2.5 !px-5 text-sm"
                >
                  + Add New Stay
                </button>
              </div>

              <div className="grid gap-4">
                {data.properties.map((p) => (
                  <div key={p.slug} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={p.cardImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-lg text-ink-900">{p.name}</h3>
                          {p.featured && <span className="chip bg-amber-50 text-amber-800 text-[11px] font-bold">Featured</span>}
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">{p.location} · <b className="text-ocean-700">{p.priceHint}</b></p>
                        <p className="text-slate-400 text-xs mt-0.5">Slug: <code className="text-slate-600">/stays/{p.slug}</code></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link to={`/stays/${p.slug}`} target="_blank" className="btn-ghost !py-1.5 !px-3 text-xs">
                        View ↗
                      </Link>
                      <button
                        onClick={() => {
                          setIsNewStay(false)
                          setEditingStay({ ...p })
                        }}
                        className="btn-ocean !py-1.5 !px-4 text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                            const updated = { ...data, properties: data.properties.filter((x) => x.slug !== p.slug) }
                            handleSaveData(updated)
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                        title="Delete stay"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Holiday Packages</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Create and update honeymoon, family, diving, and island-discovery packages.</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewPkg(true)
                    setEditingPkg({
                      slug: 'new-holiday-package',
                      name: 'New Kaani Holiday Package',
                      category: ['honeymoon'],
                      destinationSlugs: ['maafushi-local-island'],
                      propertySlugs: ['kaani-palm-beach'],
                      duration: '5 nights / 6 days',
                      nights: 5,
                      groupSize: '2 adults',
                      priceHint: 'From $1,200 / couple',
                      description: 'Customized holiday itinerary with speedboat transfers and sandbank excursion...',
                      itinerary: [
                        { day: 'Day 1', title: 'Arrival & Welcome', text: 'Speedboat transfer to Maafushi.' },
                        { day: 'Day 2', title: 'Sandbank Excursion', text: 'Half-day boat trip with picnic lunch.' },
                      ],
                      included: ['Accommodation + breakfast', 'Speedboat airport transfers', 'Sandbank excursion'],
                      notIncluded: ['International flights'],
                      addOns: ['Photo shoot'],
                      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
                      cardImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
                      gallery: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'],
                      featured: true,
                    })
                  }}
                  className="btn-primary !py-2.5 !px-5 text-sm"
                >
                  + Add New Package
                </button>
              </div>

              <div className="grid gap-4">
                {data.packages.map((pkg) => (
                  <div key={pkg.slug} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={pkg.cardImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink-900">{pkg.name}</h3>
                        <p className="text-slate-500 text-xs mt-0.5">{pkg.duration} · <b className="text-ocean-700">{pkg.priceHint}</b></p>
                        <p className="text-slate-400 text-xs mt-0.5">Route: <code className="text-slate-600">/packages/{pkg.slug}</code></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link to={`/packages/${pkg.slug}`} target="_blank" className="btn-ghost !py-1.5 !px-3 text-xs">
                        View ↗
                      </Link>
                      <button
                        onClick={() => {
                          setIsNewPkg(false)
                          setEditingPkg({ ...pkg })
                        }}
                        className="btn-ocean !py-1.5 !px-4 text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete package "${pkg.name}"?`)) {
                            const updated = { ...data, packages: data.packages.filter((x) => x.slug !== pkg.slug) }
                            handleSaveData(updated)
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCES */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Tours & Excursions</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Manage daily boat excursions, sandbank picnics, diving, and dolphin cruises.</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewExp(true)
                    setEditingExp({
                      slug: 'new-experience',
                      name: 'New Ocean Excursion',
                      category: 'cruises',
                      location: 'South Malé Atoll · Departs from Maafushi',
                      duration: '3 hours',
                      groupSize: '2–12 people',
                      priceHint: 'From $45 / person',
                      description: 'Guided excursion with experienced local boat crew...',
                      whatYouGet: ['Boat transfer', 'Snorkel gear', 'Drinking water & fruits'],
                      details: 'Departs daily at 9am from Maafushi harbour.',
                      requirements: 'Basic swimming comfort recommended.',
                      heroImage: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1600&auto=format&fit=crop',
                      cardImage: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1600&auto=format&fit=crop',
                      gallery: ['https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1600&auto=format&fit=crop'],
                      featured: true,
                    })
                  }}
                  className="btn-primary !py-2.5 !px-5 text-sm"
                >
                  + Add New Excursion
                </button>
              </div>

              <div className="grid gap-4">
                {data.experiences.map((exp) => (
                  <div key={exp.slug} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={exp.cardImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink-900">{exp.name}</h3>
                        <p className="text-slate-500 text-xs mt-0.5">{exp.duration} · <b className="text-ocean-700">{exp.priceHint}</b></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link to={`/experiences/${exp.slug}`} target="_blank" className="btn-ghost !py-1.5 !px-3 text-xs">
                        View ↗
                      </Link>
                      <button
                        onClick={() => {
                          setIsNewExp(false)
                          setEditingExp({ ...exp })
                        }}
                        className="btn-ocean !py-1.5 !px-4 text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete excursion "${exp.name}"?`)) {
                            const updated = { ...data, experiences: data.experiences.filter((x) => x.slug !== exp.slug) }
                            handleSaveData(updated)
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Destinations & Atolls</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Edit atoll descriptions, transfer times, and highlights.</p>
                </div>
              </div>

              <div className="grid gap-4">
                {data.destinations.map((d) => (
                  <div key={d.slug} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={d.cardImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink-900">{d.name}</h3>
                        <p className="text-slate-500 text-xs mt-0.5">{d.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/destinations/${d.slug}`} target="_blank" className="btn-ghost !py-1.5 !px-3 text-xs">
                        View ↗
                      </Link>
                      <button
                        onClick={() => {
                          setIsNewDest(false)
                          setEditingDest({ ...d })
                        }}
                        className="btn-ocean !py-1.5 !px-4 text-xs font-bold"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Promotions & Offers</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Seasonal discounts, promo codes, and special packages.</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewOffer(true)
                    setEditingOffer({
                      slug: 'new-offer',
                      title: 'Special Discount Offer',
                      description: 'Get exclusive discounts when booking direct...',
                      validUntil: 'Valid year-round',
                      code: 'PROMO2026',
                      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop',
                      tag: 'Special',
                    })
                  }}
                  className="btn-primary !py-2.5 !px-5 text-sm"
                >
                  + Add New Offer
                </button>
              </div>

              <div className="grid gap-4">
                {data.offers.map((o) => (
                  <div key={o.slug} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="chip bg-sunset-500 text-white text-[11px]">{o.tag}</span>
                        <h3 className="font-display font-bold text-lg text-ink-900">{o.title}</h3>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">{o.description}</p>
                      <p className="text-ocean-700 text-xs font-bold mt-1">{o.validUntil} {o.code ? `· Code: ${o.code}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsNewOffer(false)
                          setEditingOffer({ ...o })
                        }}
                        className="btn-ocean !py-1.5 !px-4 text-xs font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete offer "${o.title}"?`)) {
                            const updated = { ...data, offers: data.offers.filter((x) => x.slug !== o.slug) }
                            handleSaveData(updated)
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BACKUP & DATA EXPORT */}
          {activeTab === 'backup' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-ink-900">Backup, Export & Reset</h2>
                <p className="text-slate-500 text-sm mt-1">Export your website configuration as JSON to back up or hand over to developers.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `islandgo-content-backup-${new Date().toISOString().slice(0, 10)}.json`
                    a.click()
                    URL.revokeObjectURL(url)
                    notify('Content backup downloaded!')
                  }}
                  className="btn-ocean !py-3 !px-6"
                >
                  ↓ Download Content JSON
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
                    notify('Content copied to clipboard!')
                  }}
                  className="btn-ghost !py-3 !px-6"
                >
                  📋 Copy JSON to Clipboard
                </button>

                <button
                  onClick={() => {
                    if (confirm('Warning: This will reset all edits back to code defaults. Are you sure?')) {
                      resetContentToDefaults()
                      setData(getStoredContent())
                      notify('Reset to default repository content.')
                    }
                  }}
                  className="px-6 py-3 rounded-full text-sm font-bold text-red-600 hover:bg-red-50 border border-red-200 transition"
                >
                  ↺ Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: EDIT STAY */}
      {editingStay && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display text-2xl font-bold text-ink-900">
                {isNewStay ? 'Add New Stay' : `Edit: ${editingStay.name}`}
              </h3>
              <button onClick={() => setEditingStay(null)} className="text-slate-400 hover:text-slate-700 text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Property Name</label>
                <input
                  className="input"
                  value={editingStay.name}
                  onChange={(e) => {
                    const name = e.target.value
                    setEditingStay({
                      ...editingStay,
                      name,
                      slug: isNewStay ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : editingStay.slug,
                    })
                  }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">URL Slug (/stays/{editingStay.slug})</label>
                  <input
                    className="input"
                    value={editingStay.slug}
                    onChange={(e) => setEditingStay({ ...editingStay, slug: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Price Hint</label>
                  <input
                    className="input"
                    value={editingStay.priceHint}
                    onChange={(e) => setEditingStay({ ...editingStay, priceHint: e.target.value })}
                    placeholder="From $140 / night"
                  />
                </div>
                <div>
                  <label className="label">Location Details</label>
                  <input
                    className="input"
                    value={editingStay.location}
                    onChange={(e) => setEditingStay({ ...editingStay, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Rating / Vibe Tag</label>
                  <input
                    className="input"
                    value={editingStay.rating}
                    onChange={(e) => setEditingStay({ ...editingStay, rating: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">Hero / Card Image URL</label>
                <input
                  className="input"
                  value={editingStay.heroImage}
                  onChange={(e) => setEditingStay({ ...editingStay, heroImage: e.target.value, cardImage: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  rows={4}
                  className="input"
                  value={editingStay.description}
                  onChange={(e) => setEditingStay({ ...editingStay, description: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Highlights (comma-separated)</label>
                <input
                  className="input"
                  value={editingStay.highlights.join(', ')}
                  onChange={(e) =>
                    setEditingStay({ ...editingStay, highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </div>
              <div>
                <label className="label">Facilities (comma-separated)</label>
                <input
                  className="input"
                  value={editingStay.facilities.join(', ')}
                  onChange={(e) =>
                    setEditingStay({ ...editingStay, facilities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </div>
              <div>
                <label className="label">Speedboat Transfers</label>
                <input
                  className="input"
                  value={editingStay.transfers}
                  onChange={(e) => setEditingStay({ ...editingStay, transfers: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="stay-featured"
                  checked={!!editingStay.featured}
                  onChange={(e) => setEditingStay({ ...editingStay, featured: e.target.checked })}
                />
                <label htmlFor="stay-featured" className="text-sm font-bold text-ink-900 cursor-pointer">
                  Feature on Homepage
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setEditingStay(null)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={() => {
                  let updatedList: Property[]
                  if (isNewStay) {
                    updatedList = [...data.properties, editingStay]
                  } else {
                    updatedList = data.properties.map((p) => (p.slug === editingStay.slug ? editingStay : p))
                  }
                  handleSaveData({ ...data, properties: updatedList })
                  setEditingStay(null)
                }}
                className="btn-primary !px-6"
              >
                Save Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PACKAGE */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display text-2xl font-bold text-ink-900">
                {isNewPkg ? 'Add New Package' : `Edit: ${editingPkg.name}`}
              </h3>
              <button onClick={() => setEditingPkg(null)} className="text-slate-400 hover:text-slate-700 text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Package Name</label>
                <input
                  className="input"
                  value={editingPkg.name}
                  onChange={(e) => {
                    const name = e.target.value
                    setEditingPkg({
                      ...editingPkg,
                      name,
                      slug: isNewPkg ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : editingPkg.slug,
                    })
                  }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Slug (/packages/{editingPkg.slug})</label>
                  <input
                    className="input"
                    value={editingPkg.slug}
                    onChange={(e) => setEditingPkg({ ...editingPkg, slug: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Price Hint</label>
                  <input
                    className="input"
                    value={editingPkg.priceHint}
                    onChange={(e) => setEditingPkg({ ...editingPkg, priceHint: e.target.value })}
                    placeholder="From $1,450 / couple"
                  />
                </div>
                <div>
                  <label className="label">Duration</label>
                  <input
                    className="input"
                    value={editingPkg.duration}
                    onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                    placeholder="6 nights / 7 days"
                  />
                </div>
                <div>
                  <label className="label">Group Size</label>
                  <input
                    className="input"
                    value={editingPkg.groupSize}
                    onChange={(e) => setEditingPkg({ ...editingPkg, groupSize: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">Hero / Card Image URL</label>
                <input
                  className="input"
                  value={editingPkg.heroImage}
                  onChange={(e) => setEditingPkg({ ...editingPkg, heroImage: e.target.value, cardImage: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  rows={3}
                  className="input"
                  value={editingPkg.description}
                  onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Inclusions (comma-separated)</label>
                <input
                  className="input"
                  value={editingPkg.included.join(', ')}
                  onChange={(e) =>
                    setEditingPkg({ ...editingPkg, included: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pkg-featured"
                  checked={!!editingPkg.featured}
                  onChange={(e) => setEditingPkg({ ...editingPkg, featured: e.target.checked })}
                />
                <label htmlFor="pkg-featured" className="text-sm font-bold text-ink-900 cursor-pointer">
                  Feature on Homepage
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setEditingPkg(null)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={() => {
                  let updatedList: Package[]
                  if (isNewPkg) {
                    updatedList = [...data.packages, editingPkg]
                  } else {
                    updatedList = data.packages.map((x) => (x.slug === editingPkg.slug ? editingPkg : x))
                  }
                  handleSaveData({ ...data, packages: updatedList })
                  setEditingPkg(null)
                }}
                className="btn-primary !px-6"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT EXCURSION */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display text-2xl font-bold text-ink-900">
                {isNewExp ? 'Add Excursion' : `Edit: ${editingExp.name}`}
              </h3>
              <button onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-slate-700 text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Excursion Name</label>
                <input
                  className="input"
                  value={editingExp.name}
                  onChange={(e) => {
                    const name = e.target.value
                    setEditingExp({
                      ...editingExp,
                      name,
                      slug: isNewExp ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : editingExp.slug,
                    })
                  }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Price Hint</label>
                  <input
                    className="input"
                    value={editingExp.priceHint}
                    onChange={(e) => setEditingExp({ ...editingExp, priceHint: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Duration</label>
                  <input
                    className="input"
                    value={editingExp.duration}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">Hero / Card Image URL</label>
                <input
                  className="input"
                  value={editingExp.heroImage}
                  onChange={(e) => setEditingExp({ ...editingExp, heroImage: e.target.value, cardImage: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  rows={3}
                  className="input"
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setEditingExp(null)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={() => {
                  let updatedList: Experience[]
                  if (isNewExp) {
                    updatedList = [...data.experiences, editingExp]
                  } else {
                    updatedList = data.experiences.map((x) => (x.slug === editingExp.slug ? editingExp : x))
                  }
                  handleSaveData({ ...data, experiences: updatedList })
                  setEditingExp(null)
                }}
                className="btn-primary !px-6"
              >
                Save Excursion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT OFFER */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display text-2xl font-bold text-ink-900">
                {isNewOffer ? 'Add Promo Offer' : `Edit: ${editingOffer.title}`}
              </h3>
              <button onClick={() => setEditingOffer(null)} className="text-slate-400 hover:text-slate-700 text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Offer Title</label>
                <input
                  className="input"
                  value={editingOffer.title}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Promo Code (e.g. SUN15)</label>
                  <input
                    className="input"
                    value={editingOffer.code || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Tag (e.g. Limited, Honeymoon)</label>
                  <input
                    className="input"
                    value={editingOffer.tag}
                    onChange={(e) => setEditingOffer({ ...editingOffer, tag: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">Validity Text</label>
                <input
                  className="input"
                  value={editingOffer.validUntil}
                  onChange={(e) => setEditingOffer({ ...editingOffer, validUntil: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  rows={3}
                  className="input"
                  value={editingOffer.description}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setEditingOffer(null)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={() => {
                  let updatedList: Offer[]
                  if (isNewOffer) {
                    updatedList = [...data.offers, editingOffer]
                  } else {
                    updatedList = data.offers.map((x) => (x.slug === editingOffer.slug ? editingOffer : x))
                  }
                  handleSaveData({ ...data, offers: updatedList })
                  setEditingOffer(null)
                }}
                className="btn-primary !px-6"
              >
                Save Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE PASSWORD */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="font-display text-xl font-bold text-ink-900">Change Admin Password</h3>
            <p className="text-slate-500 text-xs">Enter a new secure password for this dashboard.</p>
            {passNotice && <p className="text-emerald-700 text-xs font-bold">{passNotice}</p>}
            <input
              type="password"
              className="input"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowPassModal(false)
                  setPassNotice('')
                  setNewPass('')
                }}
                className="btn-ghost"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (newPass.length < 6) {
                    alert('Password must be at least 6 characters.')
                    return
                  }
                  saveNewCredentials(session.email, newPass)
                  setPassNotice('Password successfully updated!')
                  setTimeout(() => {
                    setShowPassModal(false)
                    setPassNotice('')
                    setNewPass('')
                  }, 1200)
                }}
                className="btn-ocean"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
