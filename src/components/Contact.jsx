import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { labels, site } from '../lib/content'

function SocialIcon({ name }) {
  if (name === 'github') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.54 9.54 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <p className="text-sm tracking-[0.18em] uppercase">{labels.contact}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="font-display mt-10 max-w-4xl text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em]">
          {site.contactHeadline}
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <motion.a
          href={`mailto:${site.email}`}
          className="mt-12 inline-flex items-center break-all text-[clamp(1.1rem,2.2vw,1.7rem)] tracking-[-0.03em]"
          whileHover="hover"
          initial="rest"
        >
          {site.email}
          <motion.span
            className="ml-3 inline-block"
            variants={{
              rest: { x: 0 },
              hover: { x: 8 },
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            →
          </motion.span>
        </motion.a>
        {site.showContactNote ? (
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
            {site.contactNote}
          </p>
        ) : null}
      </Reveal>

      <footer className="mt-28 flex flex-col gap-4 border-t border-ink/15 pt-8 text-sm text-ink/55 dark:border-ink-dark/15 dark:text-ink-dark/55 sm:flex-row sm:items-center sm:justify-between">
        <p className="sm:flex-1">{site.location}</p>
        <nav className="flex items-center gap-1" aria-label="Social">
          {site.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center text-ink/70 transition-colors hover:text-ink dark:text-ink-dark/70 dark:hover:text-ink-dark"
            >
              <SocialIcon name={item.icon} />
            </a>
          ))}
        </nav>
        <p className="sm:flex-1 sm:text-right">
          © {site.copyrightYear} {site.name}
        </p>
      </footer>
    </section>
  )
}
