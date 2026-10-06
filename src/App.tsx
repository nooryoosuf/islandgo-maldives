import { Navigate, Route, Routes } from 'react-router-dom'
import { Header, Footer, WhatsAppFloat } from './components/layout'
import { ScrollToTop } from './components/ScrollToTop'
import { RouteMeta } from './components/RouteMeta'
import { CookieBanner, ErrorBoundary, SkipLink } from './components/feedback'
import { Home } from './pages/Home'
import { DestinationsList, DestinationDetail, StaysList, StayDetail, NotFound } from './pages/Explore'
import { PackagesList, PackageDetail, ExperiencesList, ExperienceDetail, GuideList, ArticleDetail } from './pages/Trips'
import { OffersPage, About, Contact, PlanTrip } from './pages/Info'
import { SearchPage } from './pages/Search'
import { Privacy, Terms, Cookies } from './pages/Legal'

const withMeta = (el: React.ReactNode) => (
  <>
    <RouteMeta />
    {el}
  </>
)

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <div className="flex-1" id="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={withMeta(<Home />)} />
            <Route path="/destinations" element={withMeta(<DestinationsList />)} />
            <Route path="/destinations/:slug" element={withMeta(<DestinationDetail />)} />
            <Route path="/stays" element={withMeta(<StaysList />)} />
            <Route path="/stays/:slug" element={withMeta(<StayDetail />)} />
            {/* URL-structure aliases (brief examples use /properties & /travel-guide) */}
            <Route path="/properties" element={<Navigate to="/stays" replace />} />
            <Route path="/properties/:slug" element={<Navigate to="/stays" replace />} />
            <Route path="/travel-guide" element={<Navigate to="/guide" replace />} />
            <Route path="/travel-guide/:slug" element={<Navigate to="/guide" replace />} />
            <Route path="/packages" element={withMeta(<PackagesList />)} />
            <Route path="/packages/:slug" element={withMeta(<PackageDetail />)} />
            <Route path="/experiences" element={withMeta(<ExperiencesList />)} />
            <Route path="/experiences/:slug" element={withMeta(<ExperienceDetail />)} />
            <Route path="/guide" element={withMeta(<GuideList />)} />
            <Route path="/guide/:slug" element={withMeta(<ArticleDetail />)} />
            <Route path="/offers" element={withMeta(<OffersPage />)} />
            <Route path="/about" element={withMeta(<About />)} />
            <Route path="/contact" element={withMeta(<Contact />)} />
            <Route path="/plan-trip" element={withMeta(<PlanTrip />)} />
            <Route path="/search" element={withMeta(<SearchPage />)} />
            <Route path="/privacy" element={withMeta(<Privacy />)} />
            <Route path="/terms" element={withMeta(<Terms />)} />
            <Route path="/cookies" element={withMeta(<Cookies />)} />
            <Route path="*" element={withMeta(<NotFound />)} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  )
}
