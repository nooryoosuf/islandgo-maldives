import type { ReactNode } from 'react'

// Single consistent iconography: 24px stroke icons (Lucide-style),
// always currentColor — color and size set by the caller.
function Svg({ children, className = 'w-6 h-6' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  )
}

type P = { className?: string }

export const IconSun = ({ className }: P) => (
  <Svg className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></Svg>
)

export const IconShieldCheck = ({ className }: P) => (
  <Svg className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></Svg>
)

export const IconCompass = ({ className }: P) => (
  <Svg className={className}><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></Svg>
)

export const IconAnchor = ({ className }: P) => (
  <Svg className={className}><circle cx="12" cy="5" r="3" /><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></Svg>
)

export const IconHome = ({ className }: P) => (
  <Svg className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></Svg>
)

export const IconPack = ({ className }: P) => (
  <Svg className={className}><rect x="4" y="7" width="16" height="14" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M4 12h16" /></Svg>
)

export const IconGem = ({ className }: P) => (
  <Svg className={className}><path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></Svg>
)

export const IconUsers = ({ className }: P) => (
  <Svg className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Svg>
)

export const IconClock = ({ className }: P) => (
  <Svg className={className}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>
)

export const IconHeart = ({ className }: P) => (
  <Svg className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></Svg>
)

export const IconPin = ({ className }: P) => (
  <Svg className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
)

export const IconChat = ({ className }: P) => (
  <Svg className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Svg>
)

export const IconMail = ({ className }: P) => (
  <Svg className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Svg>
)

export const IconCheck = ({ className }: P) => (
  <Svg className={className}><circle cx="12" cy="12" r="10" /><path d="m8.5 12.5 2.5 2.5 5-5.5" /></Svg>
)
