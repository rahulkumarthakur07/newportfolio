import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, canAccessAnalytics, googleProvider } from '../lib/firebase'
import {
  fetchRecentContacts,
  fetchRecentVisits,
  formatDuration,
  summarizeVisits,
} from '../lib/visits'

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'visits', label: 'Visits' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'audience', label: 'Audience' },
  { id: 'duplicates', label: 'Duplicates' },
]

function formatWhen(value) {
  if (!value) return '—'
  const date = value?.toDate ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}

function formatShortWhen(value) {
  if (!value) return '—'
  const date = value?.toDate ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function place(visit) {
  return [visit?.city, visit?.country].filter(Boolean).join(', ') || 'Unknown'
}

function Empty({ children }) {
  return <p className="py-6 text-sm text-ink/40 dark:text-ink-dark/40">{children}</p>
}

function Stat({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] tracking-[0.16em] uppercase text-ink/40 dark:text-ink-dark/40">
        {label}
      </p>
      <p className="font-display mt-1 text-[clamp(1.45rem,3vw,1.9rem)] tracking-[-0.04em]">
        {value}
      </p>
    </div>
  )
}

function RankList({ title, rows, limit = 8 }) {
  const items = rows.slice(0, limit)
  const max = items[0]?.count || 1

  return (
    <section className="min-w-0">
      <h3 className="text-[10px] tracking-[0.16em] uppercase text-ink/40 dark:text-ink-dark/40">
        {title}
      </h3>
      {items.length === 0 ? (
        <Empty>No data yet</Empty>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((row) => (
            <li key={row.label}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-[13px]">
                <span className="truncate">{row.label}</span>
                <span className="shrink-0 tabular-nums text-ink/40 dark:text-ink-dark/40">
                  {row.count}
                </span>
              </div>
              <div className="h-px bg-ink/10 dark:bg-ink-dark/10">
                <div
                  className="h-px bg-ink/45 dark:bg-ink-dark/50"
                  style={{ width: `${Math.max(6, Math.round((row.count / max) * 100))}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function DetailRow({ label, value, mono = false }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2 border-t border-ink/10 py-2 text-[13px] first:border-t-0 dark:border-ink-dark/10 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
      <dt className="text-ink/40 dark:text-ink-dark/40">{label}</dt>
      <dd className={`min-w-0 break-words ${mono ? 'font-mono text-[11px] leading-4' : ''}`}>
        {value}
      </dd>
    </div>
  )
}

function DetailSheet({ open, title, subtitle, onClose, children, footer }) {
  if (!open) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close detail"
        className="fixed inset-0 z-40 bg-ink/30 lg:hidden dark:bg-black/50"
        onClick={onClose}
      />
      <aside
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[86vh] overflow-y-auto border-t border-ink/10 bg-canvas px-4 pb-6 pt-3 dark:border-ink-dark/10 dark:bg-canvas-dark lg:static lg:z-0 lg:h-[calc(100vh-5.5rem)] lg:max-h-none lg:overflow-y-auto lg:border-t-0 lg:border-l lg:px-0 lg:pb-0 lg:pl-6 lg:pt-0 ${
          open ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="mb-3 flex items-start justify-between gap-3 lg:mb-4">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.16em] uppercase text-ink/40 dark:text-ink-dark/40">
              Detail
            </p>
            <h3 className="font-display mt-1 text-[1.2rem] tracking-[-0.03em]">{title}</h3>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-ink/45 dark:text-ink-dark/45">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-sm text-ink/50 lg:hidden dark:text-ink-dark/50"
          >
            Close
          </button>
        </div>
        <dl>{children}</dl>
        {footer ? <div className="mt-4">{footer}</div> : null}
      </aside>
    </>
  )
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full border-b border-ink/15 bg-transparent py-2 text-sm outline-none placeholder:text-ink/35 focus:border-ink dark:border-ink-dark/15 dark:placeholder:text-ink-dark/35 dark:focus:border-ink-dark sm:max-w-sm"
    />
  )
}

function LoginScreen({ onLogin, loading, error }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <p className="text-[11px] tracking-[0.18em] uppercase text-ink/40 dark:text-ink-dark/40">
        Private
      </p>
      <h1 className="font-display mt-4 text-4xl tracking-[-0.04em]">Analytics</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/60 dark:text-ink-dark/60">
        Sign in with Google to view contacts and visitor data.
      </p>
      {error ? <p className="mt-4 text-sm text-red-700 dark:text-red-400">{error}</p> : null}
      <button
        type="button"
        onClick={onLogin}
        disabled={loading}
        className="mt-10 w-fit cursor-pointer border border-ink bg-ink px-5 py-3 text-sm text-canvas transition-opacity hover:opacity-80 disabled:opacity-60 dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark"
      >
        {loading ? 'Signing in…' : 'Continue with Google'}
      </button>
    </section>
  )
}

function VisitDetailFields({ visit }) {
  return (
    <>
      <DetailRow label="When" value={formatWhen(visit.createdAt)} />
      <DetailRow label="Duration" value={formatDuration(visit.durationMs)} />
      <DetailRow label="IP" value={visit.ip} mono />
      <DetailRow label="Browser" value={visit.browserLabel || visit.browser} />
      <DetailRow label="OS" value={visit.osLabel || visit.os} />
      <DetailRow
        label="Engine"
        value={
          visit.engine
            ? `${visit.engine}${visit.engineVersion ? ` ${visit.engineVersion}` : ''}`
            : ''
        }
      />
      <DetailRow label="Device" value={visit.device} />
      <DetailRow label="Platform" value={visit.platform} />
      <DetailRow label="Vendor" value={visit.vendor} />
      <DetailRow label="Timezone" value={visit.timezone} />
      <DetailRow label="Language" value={visit.language} />
      <DetailRow
        label="Screen"
        value={
          visit.screen
            ? `${visit.screen.width}×${visit.screen.height} @${visit.screen.pixelRatio || 1}x`
            : ''
        }
      />
      <DetailRow
        label="Viewport"
        value={visit.viewport ? `${visit.viewport.width}×${visit.viewport.height}` : ''}
      />
      <DetailRow
        label="Network"
        value={
          visit.connection
            ? [
                visit.connection.effectiveType,
                visit.connection.downlink ? `${visit.connection.downlink}Mbps` : '',
                visit.connection.rtt ? `${visit.connection.rtt}ms` : '',
              ]
                .filter(Boolean)
                .join(' · ')
            : ''
        }
      />
      <DetailRow
        label="Hardware"
        value={[
          visit.hardwareConcurrency ? `${visit.hardwareConcurrency} cores` : '',
          visit.deviceMemory ? `${visit.deviceMemory}GB` : '',
          visit.maxTouchPoints ? `${visit.maxTouchPoints} touch` : '',
        ]
          .filter(Boolean)
          .join(' · ')}
      />
      <DetailRow label="Path" value={visit.path} mono />
      <DetailRow label="URL" value={visit.href} mono />
      <DetailRow label="Referrer" value={visit.referrer || 'Direct'} />
      <DetailRow label="Visitor" value={visit.visitorId} mono />
      <DetailRow label="Fingerprint" value={visit.fingerprint} mono />
      <DetailRow label="User agent" value={visit.userAgent} />
    </>
  )
}

function OverviewPanel({ summary, contacts, visits, onOpenVisit, onOpenContact }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-b border-ink/10 pb-6 dark:border-ink-dark/10 sm:grid-cols-4 lg:grid-cols-6">
        <Stat label="Visits" value={summary.total} />
        <Stat label="Unique" value={summary.uniqueVisitors} />
        <Stat label="Avg time" value={formatDuration(summary.avgDurationMs)} />
        <Stat label="Longest" value={formatDuration(summary.maxDurationMs)} />
        <Stat label="Contacts" value={contacts.length} />
        <Stat label="Duplicates" value={summary.duplicates.length} />
      </div>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        <RankList title="Countries" rows={summary.byCountry} />
        <RankList title="Browsers" rows={summary.byBrowser} />
        <RankList title="Systems" rows={summary.byOs} />
        <RankList title="Devices" rows={summary.byDevice} />
        <RankList title="Paths" rows={summary.byPath} />
        <RankList title="Referrers" rows={summary.byReferrer} />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <section>
          <h3 className="text-[10px] tracking-[0.16em] uppercase text-ink/40 dark:text-ink-dark/40">
            Latest visits
          </h3>
          <ul className="mt-1">
            {visits.slice(0, 10).map((visit) => (
              <li key={visit.id} className="border-t border-ink/10 dark:border-ink-dark/10">
                <button
                  type="button"
                  onClick={() => onOpenVisit(visit)}
                  className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
                >
                  <span className="min-w-0 truncate text-[14px] tracking-[-0.01em]">
                    {place(visit)}
                    <span className="text-ink/35 dark:text-ink-dark/35">
                      {' '}
                      · {visit.browser || visit.device || '—'} · {visit.path || '/'}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11px] text-ink/35 dark:text-ink-dark/35">
                    {formatShortWhen(visit.createdAt)}
                  </span>
                </button>
              </li>
            ))}
            {visits.length === 0 ? <Empty>No visits yet</Empty> : null}
          </ul>
        </section>

        <section>
          <h3 className="text-[10px] tracking-[0.16em] uppercase text-ink/40 dark:text-ink-dark/40">
            Latest contacts
          </h3>
          <ul className="mt-1">
            {contacts.slice(0, 10).map((contact) => (
              <li key={contact.id} className="border-t border-ink/10 dark:border-ink-dark/10">
                <button
                  type="button"
                  onClick={() => onOpenContact(contact)}
                  className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
                >
                    <span className="min-w-0 truncate text-[14px] tracking-[-0.01em]">
                    {contact.name}
                    <span className="text-ink/35 dark:text-ink-dark/35">
                      {' '}
                      · {contact.email}
                      {contact.subject || contact.project
                        ? ` · ${contact.subject || contact.project}`
                        : ''}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11px] text-ink/35 dark:text-ink-dark/35">
                    {formatShortWhen(contact.createdAt)}
                  </span>
                </button>
              </li>
            ))}
            {contacts.length === 0 ? <Empty>No contacts yet</Empty> : null}
          </ul>
        </section>
      </div>
    </div>
  )
}

function VisitsPanel({ visits, selected, onSelect, query, onQuery, detailOpen, onCloseDetail }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return visits
    return visits.filter((visit) =>
      [
        visit.ip,
        visit.country,
        visit.city,
        visit.device,
        visit.browser,
        visit.browserLabel,
        visit.os,
        visit.osLabel,
        visit.path,
        visit.timezone,
        visit.language,
        visit.referrer,
        visit.fingerprint,
        visit.userAgent,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [visits, query])

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)] lg:items-start lg:gap-0">
      <div className="min-w-0 lg:pr-6">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-sm text-ink/40 dark:text-ink-dark/40">
            {filtered.length}
            <span className="text-ink/25 dark:text-ink-dark/25"> / {visits.length}</span>
          </p>
          <SearchInput
            value={query}
            onChange={onQuery}
            placeholder="Filter IP, country, browser…"
          />
        </div>

        <ul>
          {filtered.map((visit) => {
            const active = selected?.id === visit.id
            return (
              <li key={visit.id} className="border-t border-ink/10 dark:border-ink-dark/10">
                <button
                  type="button"
                  onClick={() => onSelect(visit)}
                  className={`grid w-full grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-left transition-opacity sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.9fr)_auto] ${
                    active ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className="min-w-0 truncate text-[14px] tracking-[-0.01em]">
                    {place(visit)}
                  </span>
                  <span className="hidden min-w-0 truncate text-xs text-ink/40 sm:block dark:text-ink-dark/40">
                    {visit.browserLabel || visit.browser || '—'} · {visit.os || '—'}
                  </span>
                  <span className="min-w-0 truncate font-mono text-[11px] text-ink/35 dark:text-ink-dark/35">
                    {visit.path || '/'}
                    {visit.ip ? ` · ${visit.ip}` : ''}
                  </span>
                  <span className="shrink-0 text-[11px] text-ink/35 dark:text-ink-dark/35">
                    {formatShortWhen(visit.createdAt)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        {filtered.length === 0 ? <Empty>No matching visits</Empty> : null}
      </div>

      <DetailSheet
        open={Boolean(selected) && detailOpen}
        title={selected ? place(selected) : 'Visit'}
        subtitle={selected ? formatWhen(selected.createdAt) : ''}
        onClose={onCloseDetail}
      >
        {selected ? <VisitDetailFields visit={selected} /> : null}
      </DetailSheet>
    </div>
  )
}

function ContactsPanel({
  contacts,
  selected,
  onSelect,
  query,
  onQuery,
  detailOpen,
  onCloseDetail,
}) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return contacts
    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.subject, contact.project, contact.message]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [contacts, query])

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)] lg:items-start">
      <div className="min-w-0 lg:pr-6">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-sm text-ink/40 dark:text-ink-dark/40">
            {filtered.length}
            <span className="text-ink/25 dark:text-ink-dark/25"> / {contacts.length}</span>
          </p>
          <SearchInput value={query} onChange={onQuery} placeholder="Filter contacts…" />
        </div>

        <ul>
          {filtered.map((contact) => {
            const active = selected?.id === contact.id
            return (
              <li key={contact.id} className="border-t border-ink/10 dark:border-ink-dark/10">
                <button
                  type="button"
                  onClick={() => onSelect(contact)}
                  className={`flex w-full items-start justify-between gap-3 py-2.5 text-left transition-opacity ${
                    active ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-[14px] tracking-[-0.01em]">
                      {contact.name}
                      <span className="text-ink/35 dark:text-ink-dark/35"> · {contact.email}</span>
                    </span>
                    <span className="mt-0.5 line-clamp-1 text-[13px] text-ink/55 dark:text-ink-dark/55">
                      {contact.subject || contact.project
                        ? `${contact.subject || contact.project} — `
                        : ''}
                      {contact.message}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11px] text-ink/35 dark:text-ink-dark/35">
                    {formatShortWhen(contact.createdAt)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        {filtered.length === 0 ? <Empty>No matching contacts</Empty> : null}
      </div>

      <DetailSheet
        open={Boolean(selected) && detailOpen}
        title={selected?.name || 'Contact'}
        subtitle={selected?.email || ''}
        onClose={onCloseDetail}
        footer={
          selected?.email ? (
            <a
              href={`mailto:${selected.email}`}
              className="inline-flex border border-ink bg-ink px-4 py-2.5 text-sm text-canvas dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark"
            >
              Reply
            </a>
          ) : null
        }
      >
        {selected ? (
          <>
            <DetailRow label="When" value={formatWhen(selected.createdAt)} />
            <DetailRow label="Email" value={selected.email} />
            <DetailRow label="Subject" value={selected.subject || selected.project || '—'} />
            <DetailRow label="Description" value={selected.description || selected.message} />
            <DetailRow label="Timezone" value={selected.timezone} />
            <DetailRow label="Language" value={selected.language} />
            <DetailRow label="Path" value={selected.path} mono />
            <DetailRow label="User agent" value={selected.userAgent} />
          </>
        ) : null}
      </DetailSheet>
    </div>
  )
}

function AudiencePanel({ summary }) {
  return (
    <div className="space-y-7">
      <div className="grid grid-cols-3 gap-x-4 gap-y-4 border-b border-ink/10 pb-5 dark:border-ink-dark/10">
        <Stat label="Average" value={formatDuration(summary.avgDurationMs)} />
        <Stat label="Longest" value={formatDuration(summary.maxDurationMs)} />
        <Stat label="Total time" value={formatDuration(summary.totalDurationMs)} />
      </div>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <RankList title="Countries" rows={summary.byCountry} limit={12} />
        <RankList title="Cities" rows={summary.byCity} limit={12} />
        <RankList title="Browsers" rows={summary.byBrowser} limit={12} />
        <RankList title="Systems" rows={summary.byOs} limit={12} />
        <RankList title="Devices" rows={summary.byDevice} limit={12} />
        <RankList title="Timezones" rows={summary.byTimezone} limit={12} />
        <RankList title="Languages" rows={summary.byLanguage} limit={12} />
        <RankList title="Referrers" rows={summary.byReferrer} limit={12} />
        <RankList title="Paths" rows={summary.byPath} limit={12} />
      </div>
    </div>
  )
}

function DuplicatesPanel({ summary, visits, onOpenVisit }) {
  return (
    <div>
      <p className="text-sm text-ink/50 dark:text-ink-dark/50">
        Fingerprints with more than one session — useful for spotting repeats or spam.
      </p>
      <ul className="mt-3">
        {summary.duplicates.map((row) => {
          const sample = visits.find(
            (visit) => (visit.fingerprint || visit.visitorId || visit.id) === row.key,
          )
          return (
            <li key={row.key} className="border-t border-ink/10 dark:border-ink-dark/10">
              <button
                type="button"
                onClick={() => sample && onOpenVisit(sample)}
                className="grid w-full grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-left"
              >
                <span className="min-w-0 truncate font-mono text-[11px]">{row.key}</span>
                <span className="min-w-0 truncate text-xs text-ink/40 dark:text-ink-dark/40">
                  {row.ip || 'No IP'} · {row.country || 'Unknown'} · {row.device || '—'}
                </span>
                <span className="shrink-0 text-sm tabular-nums">{row.count}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {summary.duplicates.length === 0 ? <Empty>No duplicates yet</Empty> : null}
    </div>
  )
}

export default function AnalyticsPage() {
  const [user, setUser] = useState(undefined)
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [contacts, setContacts] = useState([])
  const [visits, setVisits] = useState([])
  const [section, setSection] = useState('overview')
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [visitDetailOpen, setVisitDetailOpen] = useState(false)
  const [contactDetailOpen, setContactDetailOpen] = useState(false)
  const [visitQuery, setVisitQuery] = useState('')
  const [contactQuery, setContactQuery] = useState('')

  useEffect(() => {
    return onAuthStateChanged(auth, (next) => setUser(next))
  }, [])

  const allowed = canAccessAnalytics(user)

  useEffect(() => {
    if (!allowed) return

    let active = true
    async function load() {
      setLoading(true)
      setLoadError('')
      try {
        const [nextContacts, nextVisits] = await Promise.all([
          fetchRecentContacts(),
          fetchRecentVisits(),
        ])
        if (!active) return
        setContacts(nextContacts)
        setVisits(nextVisits)
        setSelectedVisit(nextVisits[0] || null)
        setSelectedContact(nextContacts[0] || null)
        setVisitDetailOpen(Boolean(nextVisits[0]) && window.matchMedia('(min-width: 1024px)').matches)
        setContactDetailOpen(
          Boolean(nextContacts[0]) && window.matchMedia('(min-width: 1024px)').matches,
        )
      } catch (err) {
        if (!active) return
        setLoadError(err?.message || 'Failed to load analytics.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [allowed])

  const summary = useMemo(() => summarizeVisits(visits), [visits])
  const activeLabel = NAV.find((item) => item.id === section)?.label || 'Overview'

  async function login() {
    setSigningIn(true)
    setAuthError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      setAuthError(err?.message || 'Google sign-in failed.')
    } finally {
      setSigningIn(false)
    }
  }

  async function logout() {
    await signOut(auth)
  }

  function openVisit(visit) {
    setSelectedVisit(visit)
    setVisitDetailOpen(true)
    setSection('visits')
  }

  function openContact(contact) {
    setSelectedContact(contact)
    setContactDetailOpen(true)
    setSection('contacts')
  }

  function selectVisit(visit) {
    setSelectedVisit(visit)
    setVisitDetailOpen(true)
  }

  function selectContact(contact) {
    setSelectedContact(contact)
    setContactDetailOpen(true)
  }

  if (user === undefined) {
    return (
      <section className="px-5 py-24 text-sm text-ink/40 dark:text-ink-dark/40 sm:px-8">
        Checking session…
      </section>
    )
  }

  if (!user) {
    return <LoginScreen onLogin={login} loading={signingIn} error={authError} />
  }

  if (!allowed) {
    return (
      <section className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl tracking-[-0.04em]">Access denied</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/60 dark:text-ink-dark/60">
          Signed in as {user.email}, but this account can’t view analytics.
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-8 w-fit cursor-pointer border border-current px-5 py-3 text-sm"
        >
          Sign out
        </button>
      </section>
    )
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] xl:grid-cols-[12rem_minmax(0,1fr)]">
      <aside className="border-b border-ink/10 px-4 py-4 dark:border-ink-dark/10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r lg:px-4 lg:py-5">
        <div className="flex items-end justify-between gap-4 lg:block">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-ink/35 dark:text-ink-dark/35">
              Private
            </p>
            <h1 className="font-display mt-0.5 text-xl tracking-[-0.04em]">Analytics</h1>
          </div>
          <div className="flex items-center gap-4 text-sm lg:hidden">
            <Link to="/" className="text-ink/45 dark:text-ink-dark/45">
              Site
            </Link>
            <button type="button" onClick={logout} className="text-ink/45 dark:text-ink-dark/45">
              Out
            </button>
          </div>
        </div>

        <nav
          className="-mx-4 mt-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:mt-6 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          aria-label="Analytics sections"
        >
          {NAV.map((item) => {
            const active = section === item.id
            const count =
              item.id === 'visits'
                ? visits.length
                : item.id === 'contacts'
                  ? contacts.length
                  : item.id === 'duplicates'
                    ? summary.duplicates.length
                    : null

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`shrink-0 border-b-2 px-2.5 py-1.5 text-[13px] transition-colors lg:border-b-0 lg:border-l-2 lg:px-2.5 lg:py-2 lg:text-left ${
                  active
                    ? 'border-ink text-ink dark:border-ink-dark dark:text-ink-dark'
                    : 'border-transparent text-ink/40 hover:text-ink dark:text-ink-dark/40 dark:hover:text-ink-dark'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {item.label}
                  {count !== null ? (
                    <span className="tabular-nums text-[11px] opacity-60">{count}</span>
                  ) : null}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto hidden pt-6 lg:block">
          <p className="truncate text-[11px] text-ink/35 dark:text-ink-dark/35">{user.email}</p>
          <div className="mt-3 flex flex-col items-start gap-1.5 text-[13px]">
            <Link
              to="/"
              className="text-ink/55 transition-colors hover:text-ink dark:text-ink-dark/55 dark:hover:text-ink-dark"
            >
              ← Site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer text-ink/55 transition-colors hover:text-ink dark:text-ink-dark/55 dark:hover:text-ink-dark"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-4 sm:px-5 lg:px-6 lg:py-5 xl:px-8">
        <header className="mb-5 flex items-end justify-between gap-3 border-b border-ink/10 pb-3 dark:border-ink-dark/10">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-ink/35 dark:text-ink-dark/35">
              {activeLabel}
            </p>
            <h2 className="font-display mt-1 text-[clamp(1.4rem,2.5vw,1.9rem)] tracking-[-0.04em]">
              {activeLabel}
            </h2>
          </div>
          {loading ? (
            <p className="text-sm text-ink/35 dark:text-ink-dark/35">Loading…</p>
          ) : null}
        </header>

        {loadError ? (
          <p className="mb-4 text-sm text-red-700 dark:text-red-400">{loadError}</p>
        ) : null}

        {section === 'overview' ? (
          <OverviewPanel
            summary={summary}
            contacts={contacts}
            visits={visits}
            onOpenVisit={openVisit}
            onOpenContact={openContact}
          />
        ) : null}

        {section === 'visits' ? (
          <VisitsPanel
            visits={visits}
            selected={selectedVisit}
            onSelect={selectVisit}
            query={visitQuery}
            onQuery={setVisitQuery}
            detailOpen={visitDetailOpen}
            onCloseDetail={() => setVisitDetailOpen(false)}
          />
        ) : null}

        {section === 'contacts' ? (
          <ContactsPanel
            contacts={contacts}
            selected={selectedContact}
            onSelect={selectContact}
            query={contactQuery}
            onQuery={setContactQuery}
            detailOpen={contactDetailOpen}
            onCloseDetail={() => setContactDetailOpen(false)}
          />
        ) : null}

        {section === 'audience' ? <AudiencePanel summary={summary} /> : null}

        {section === 'duplicates' ? (
          <DuplicatesPanel summary={summary} visits={visits} onOpenVisit={openVisit} />
        ) : null}
      </main>
    </div>
  )
}
