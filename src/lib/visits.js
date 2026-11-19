import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const SESSION_KEY = 'portfolio_visit_session'
const VISITOR_KEY = 'portfolio_visitor_id'

function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function getOrCreateVisitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_KEY)
    if (existing) return existing
    const id = randomId()
    localStorage.setItem(VISITOR_KEY, id)
    return id
  } catch {
    return randomId()
  }
}

function detectDevice(ua = '') {
  const value = ua.toLowerCase()
  if (/ipad|tablet/.test(value)) return 'tablet'
  if (/mobi|iphone|android/.test(value)) return 'mobile'
  return 'desktop'
}

function matchVersion(ua, pattern) {
  const match = ua.match(pattern)
  return match?.[1] || ''
}

function parseBrowser(ua = '') {
  const value = ua.toLowerCase()

  if (value.includes('edg/')) {
    return { name: 'Edge', version: matchVersion(ua, /Edg\/([\d.]+)/i) }
  }
  if (value.includes('opr/') || value.includes('opera')) {
    return {
      name: 'Opera',
      version: matchVersion(ua, /(?:OPR|Opera)\/([\d.]+)/i),
    }
  }
  if (value.includes('firefox/')) {
    return { name: 'Firefox', version: matchVersion(ua, /Firefox\/([\d.]+)/i) }
  }
  if (value.includes('chrome/') && !value.includes('edg/')) {
    return { name: 'Chrome', version: matchVersion(ua, /Chrome\/([\d.]+)/i) }
  }
  if (value.includes('safari/') && !value.includes('chrome/')) {
    return { name: 'Safari', version: matchVersion(ua, /Version\/([\d.]+)/i) }
  }
  if (value.includes('msie') || value.includes('trident/')) {
    return {
      name: 'IE',
      version: matchVersion(ua, /(?:MSIE |rv:)([\d.]+)/i),
    }
  }

  return { name: 'Unknown', version: '' }
}

function parseOs(ua = '') {
  const value = ua.toLowerCase()

  if (value.includes('windows nt 10')) return { name: 'Windows', version: '10/11' }
  if (value.includes('windows nt 6.3')) return { name: 'Windows', version: '8.1' }
  if (value.includes('windows nt 6.2')) return { name: 'Windows', version: '8' }
  if (value.includes('windows nt 6.1')) return { name: 'Windows', version: '7' }
  if (value.includes('windows')) return { name: 'Windows', version: '' }
  if (value.includes('android')) {
    return { name: 'Android', version: matchVersion(ua, /Android ([\d.]+)/i) }
  }
  if (value.includes('iphone') || value.includes('ipad') || value.includes('ipod')) {
    return {
      name: 'iOS',
      version: matchVersion(ua, /OS ([\d_]+)/i).replace(/_/g, '.'),
    }
  }
  if (value.includes('mac os x') || value.includes('macintosh')) {
    return {
      name: 'macOS',
      version: matchVersion(ua, /Mac OS X ([\d_]+)/i).replace(/_/g, '.'),
    }
  }
  if (value.includes('cros')) return { name: 'Chrome OS', version: '' }
  if (value.includes('linux')) return { name: 'Linux', version: '' }

  return { name: 'Unknown', version: '' }
}

function parseEngine(ua = '') {
  const value = ua.toLowerCase()
  if (value.includes('gecko/') && value.includes('firefox')) {
    return { name: 'Gecko', version: matchVersion(ua, /rv:([\d.]+)/i) }
  }
  if (value.includes('applewebkit/')) {
    return { name: 'WebKit', version: matchVersion(ua, /AppleWebKit\/([\d.]+)/i) }
  }
  if (value.includes('trident/')) {
    return { name: 'Trident', version: matchVersion(ua, /Trident\/([\d.]+)/i) }
  }
  return { name: 'Unknown', version: '' }
}

function collectBrowserData() {
  const ua = navigator.userAgent || ''
  const browser = parseBrowser(ua)
  const os = parseOs(ua)
  const engine = parseEngine(ua)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  return {
    browser: browser.name,
    browserVersion: browser.version,
    browserLabel: browser.version ? `${browser.name} ${browser.version}` : browser.name,
    os: os.name,
    osVersion: os.version,
    osLabel: os.version ? `${os.name} ${os.version}` : os.name,
    engine: engine.name,
    engineVersion: engine.version,
    vendor: navigator.vendor || '',
    cookieEnabled: Boolean(navigator.cookieEnabled),
    doNotTrack: navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || '',
    online: Boolean(navigator.onLine),
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: navigator.deviceMemory || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    pdfViewerEnabled: Boolean(navigator.pdfViewerEnabled),
    webdriver: Boolean(navigator.webdriver),
    colorDepth: window.screen?.colorDepth || 0,
    orientation: screen.orientation?.type || '',
    viewport: {
      width: window.innerWidth || 0,
      height: window.innerHeight || 0,
    },
    connection: connection
      ? {
          effectiveType: connection.effectiveType || '',
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
          saveData: Boolean(connection.saveData),
        }
      : null,
    userAgentData: navigator.userAgentData
      ? {
          brands: (navigator.userAgentData.brands || []).map((item) => ({
            brand: item.brand,
            version: item.version,
          })),
          mobile: Boolean(navigator.userAgentData.mobile),
          platform: navigator.userAgentData.platform || '',
        }
      : null,
  }
}

const GEO_CACHE_KEY = 'portfolio_geo_cache'
const GEO_CACHE_TTL_MS = 1000 * 60 * 60 * 12

let startPromise = null
let finishPromise = null
let lastWrittenDuration = -1
let pendingDuration = null

async function fetchGeo() {
  try {
    const cached = localStorage.getItem(GEO_CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed?.savedAt && Date.now() - parsed.savedAt < GEO_CACHE_TTL_MS) {
        return parsed.data || null
      }
    }
  } catch {
    // ignore cache errors
  }

  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(4000),
    })
    if (!response.ok) return null
    const data = await response.json()
    if (data.error) return null
    const geo = {
      ip: data.ip || '',
      country: data.country_name || '',
      countryCode: data.country_code || '',
      city: data.city || '',
      region: data.region || '',
    }
    try {
      localStorage.setItem(
        GEO_CACHE_KEY,
        JSON.stringify({ savedAt: Date.now(), data: geo }),
      )
    } catch {
      // ignore cache errors
    }
    return geo
  } catch {
    return null
  }
}

function fingerprint(ip, ua) {
  const raw = `${ip || 'unknown'}|${ua || ''}`
  let hash = 0
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(i)
    hash |= 0
  }
  return `fp_${Math.abs(hash)}`
}

/** One Firestore create per browser tab session. No reads. */
export async function startVisit() {
  if (typeof window === 'undefined') return null

  try {
    const existing = sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    if (startPromise) return startPromise

    startPromise = (async () => {
      const visitorId = getOrCreateVisitorId()
      const userAgent = navigator.userAgent || ''
      const browserData = collectBrowserData()
      const geo = await fetchGeo()
      const startedAt = Date.now()

      const ref = await addDoc(collection(db, 'visits'), {
        visitorId,
        fingerprint: fingerprint(geo?.ip, userAgent),
        ip: geo?.ip || '',
        country: geo?.country || '',
        countryCode: geo?.countryCode || '',
        city: geo?.city || '',
        region: geo?.region || '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        language: navigator.language || '',
        languages: Array.from(navigator.languages || []),
        userAgent,
        device: detectDevice(userAgent),
        platform: navigator.platform || '',
        ...browserData,
        screen: {
          width: window.screen?.width || 0,
          height: window.screen?.height || 0,
          availWidth: window.screen?.availWidth || 0,
          availHeight: window.screen?.availHeight || 0,
          pixelRatio: window.devicePixelRatio || 1,
        },
        path: window.location.pathname,
        href: window.location.href,
        referrer: document.referrer || '',
        startedAt,
        durationMs: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      sessionStorage.setItem(SESSION_KEY, ref.id)
      lastWrittenDuration = 0
      return ref.id
    })()

    return await startPromise
  } catch {
    return null
  } finally {
    startPromise = null
  }
}

/**
 * At most one duration update per leave. Skips no-op / duplicate flushes.
 * Visitors never read from Firestore.
 */
export async function finishVisit(durationMs) {
  if (typeof window === 'undefined') return

  const duration = Math.max(0, Math.round(durationMs))
  pendingDuration = duration

  if (finishPromise) return finishPromise

  finishPromise = (async () => {
    try {
      while (pendingDuration !== null) {
        const nextDuration = pendingDuration
        pendingDuration = null

        const id = sessionStorage.getItem(SESSION_KEY)
        if (!id) return
        if (nextDuration === lastWrittenDuration) return

        await updateDoc(doc(db, 'visits', id), {
          durationMs: nextDuration,
          path: window.location.pathname,
          updatedAt: serverTimestamp(),
        })
        lastWrittenDuration = nextDuration
      }
    } catch {
      // tracking must never break the site
    } finally {
      finishPromise = null
    }
  })()

  return finishPromise
}

export async function fetchRecentContacts(max = 100) {
  const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(max))
  const snap = await getDocs(q)
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }))
}

export async function fetchRecentVisits(max = 200) {
  const q = query(collection(db, 'visits'), orderBy('createdAt', 'desc'), limit(max))
  const snap = await getDocs(q)
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }))
}

function tally(map, key) {
  const label = key || 'Unknown'
  map[label] = (map[label] || 0) + 1
}

function ranked(map) {
  return Object.entries(map)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
}

export function summarizeVisits(visits) {
  const byCountry = {}
  const byCity = {}
  const byDevice = {}
  const byBrowser = {}
  const byOs = {}
  const byPath = {}
  const byTimezone = {}
  const byLanguage = {}
  const byReferrer = {}
  const byFingerprint = {}
  let totalDuration = 0
  let maxDuration = 0

  for (const visit of visits) {
    const fp = visit.fingerprint || visit.visitorId || visit.id
    const duration = visit.durationMs || 0
    const referrer = visit.referrer ? safeHost(visit.referrer) : 'Direct'

    tally(byCountry, visit.country || 'Unknown')
    tally(byCity, [visit.city, visit.country].filter(Boolean).join(', ') || 'Unknown')
    tally(byDevice, visit.device || 'unknown')
    tally(byBrowser, visit.browserLabel || visit.browser || 'Unknown')
    tally(byOs, visit.osLabel || visit.os || 'Unknown')
    tally(byPath, visit.path || '/')
    tally(byTimezone, visit.timezone || 'Unknown')
    tally(byLanguage, visit.language || 'Unknown')
    tally(byReferrer, referrer)
    byFingerprint[fp] = (byFingerprint[fp] || 0) + 1
    totalDuration += duration
    if (duration > maxDuration) maxDuration = duration
  }

  const duplicates = Object.entries(byFingerprint)
    .filter(([, count]) => count > 1)
    .map(([key, count]) => {
      const samples = visits.filter(
        (visit) => (visit.fingerprint || visit.visitorId || visit.id) === key,
      )
      const latest = samples[0]
      return {
        key,
        count,
        ip: latest?.ip || '',
        country: latest?.country || '',
        device: latest?.device || '',
        visitorId: latest?.visitorId || '',
      }
    })
    .sort((a, b) => b.count - a.count)

  return {
    total: visits.length,
    uniqueVisitors: Object.keys(byFingerprint).length,
    avgDurationMs: visits.length ? Math.round(totalDuration / visits.length) : 0,
    maxDurationMs: maxDuration,
    totalDurationMs: totalDuration,
    byCountry: ranked(byCountry),
    byCity: ranked(byCity),
    byDevice: ranked(byDevice),
    byBrowser: ranked(byBrowser),
    byOs: ranked(byOs),
    byPath: ranked(byPath),
    byTimezone: ranked(byTimezone),
    byLanguage: ranked(byLanguage),
    byReferrer: ranked(byReferrer),
    duplicates,
  }
}

function safeHost(url) {
  try {
    return new URL(url).hostname || url
  } catch {
    return url
  }
}

export function formatDuration(ms = 0) {
  const totalSec = Math.max(0, Math.round(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  if (min <= 0) return `${sec}s`
  return `${min}m ${sec}s`
}
