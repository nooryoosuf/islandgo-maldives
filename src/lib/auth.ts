// Minimal admin authentication for IslandGo Maldives Dashboard.

export interface AdminUser {
  email: string
  name: string
  role: 'admin'
}

const AUTH_STORAGE_KEY = 'ig_admin_session'
const CREDS_STORAGE_KEY = 'ig_admin_creds'

// Default credentials (can be updated from the dashboard or via environment)
const DEFAULT_EMAIL = 'admin@islandgomv.com'
const DEFAULT_PASSWORD = 'islandgo2026!'

function getStoredCredentials(): { email: string; pass: string } {
  try {
    const raw = localStorage.getItem(CREDS_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { email: DEFAULT_EMAIL, pass: DEFAULT_PASSWORD }
}

export function saveNewCredentials(email: string, pass: string) {
  try {
    localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify({ email, pass }))
    return true
  } catch {
    return false
  }
}

export function getAdminSession(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function loginAdmin(email: string, pass: string, remember = false): boolean {
  const creds = getStoredCredentials()
  const cleanEmail = email.trim().toLowerCase()
  const cleanStored = creds.email.trim().toLowerCase()

  if (cleanEmail === cleanStored && pass === creds.pass) {
    const user: AdminUser = { email: cleanEmail, name: 'IslandGo Admin', role: 'admin' }
    const str = JSON.stringify(user)
    if (remember) {
      localStorage.setItem(AUTH_STORAGE_KEY, str)
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, str)
    }
    return true
  }
  return false
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
