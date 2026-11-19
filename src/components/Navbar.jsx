import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useContactModal } from '../context/ContactModalContext'
import { labels, nav, site } from '../lib/content'
import { scrollToId } from '../lib/scroll'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3v1.8M12 19.2V21M4.93 4.93l1.27 1.27M17.8 17.8l1.27 1.27M3 12h1.8M19.2 12H21M4.93 19.07l1.27-1.27M17.8 6.2l1.27-1.27"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HamburgerIcon({ open }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ${
          open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ${
          open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
        }`}
      />
    </span>
  )
}

function NavLink({ hash, label, onClick, className = '' }) {
  return (
    <motion.a
      href={`/#${hash}`}
      onClick={onClick}
      className={`relative inline-block ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <span className="relative z-10">{label}</span>
      <motion.span
        className="absolute left-0 -bottom-0.5 h-px w-full origin-left bg-current"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { openContact } = useContactModal()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const isDark = theme === 'dark'

  function goToSection(event, hash) {
    event.preventDefault()
    setOpen(false)

    if (location.pathname === '/' && location.hash === `#${hash}`) {
      scrollToId(hash)
      return
    }

    navigate(`/#${hash}`)
  }

  function goHome(event) {
    if (location.pathname !== '/') return
    event.preventDefault()
    setOpen(false)
    scrollToId('top')
    if (location.hash) navigate('/', { replace: true })
  }

  function handleContact(event) {
    event.preventDefault()
    setOpen(false)
    openContact()
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto relative flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          onClick={goHome}
          className="text-[15px] tracking-[-0.01em] text-ink dark:text-ink-dark"
        >
          {site.name}
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[15px] tracking-[-0.01em] md:flex lg:gap-8">
          {nav.map((link) => (
            <NavLink
              key={link.hash}
              {...link}
              onClick={(event) =>
                link.hash === 'top' ? goHome(event) : goToSection(event, link.hash)
              }
            />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.button
            type="button"
            onClick={toggleTheme}
            className="flex h-11 w-11 cursor-pointer items-center justify-center md:h-auto md:w-auto md:gap-2 md:text-[15px] md:tracking-[-0.01em]"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            whileHover={{ opacity: 0.55 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {isDark ? <MoonIcon /> : <SunIcon />}
                <span className="hidden md:inline">{isDark ? 'Dark' : 'Light'}</span>
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            onClick={handleContact}
            className="hidden min-h-11 cursor-pointer items-center rounded-none border border-current px-7 py-2.5 text-[16px] tracking-[-0.01em] transition-colors duration-200 hover:bg-ink hover:text-canvas md:inline-flex dark:hover:bg-ink-dark dark:hover:text-canvas-dark"
            aria-label="Open contact form"
            whileTap={{ scale: 0.98 }}
          >
            {labels.workCta}
          </motion.button>

          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="pointer-events-auto mx-5 mb-4 flex flex-col gap-5 bg-ink px-6 py-7 text-lg text-canvas dark:bg-ink-dark dark:text-canvas-dark md:hidden"
          >
            {nav.map((link) => (
              <a
                key={link.hash}
                href={link.hash === 'top' ? '/' : `/#${link.hash}`}
                onClick={(event) =>
                  link.hash === 'top' ? goHome(event) : goToSection(event, link.hash)
                }
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleContact}
              className="mt-1 inline-flex cursor-pointer items-center justify-center border border-current px-5 py-2.5 text-[15px]"
            >
              {labels.workCta}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
