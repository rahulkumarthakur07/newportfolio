import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { site } from '../lib/content'

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <p className="text-sm tracking-[0.18em] uppercase">Drop me a line</p>
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
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
          {site.contactNote}
        </p>
      </Reveal>

      <footer className="mt-28 flex flex-col gap-3 border-t border-ink/15 pt-8 text-sm text-ink/55 dark:border-ink-dark/15 dark:text-ink-dark/55 sm:flex-row sm:items-center sm:justify-between">
        <p>{site.location}</p>
        <p>
          © 2024 {site.name}
        </p>
      </footer>
    </section>
  )
}
