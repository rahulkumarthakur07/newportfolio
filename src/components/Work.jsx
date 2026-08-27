import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { projects } from '../lib/content'

const PREVIEW_WIDTH = 300

export default function Work() {
  const count = String(projects.length).padStart(2, '0')
  const [active, setActive] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  function onMove(event, project) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setCursor({ x: event.clientX, y: event.clientY })
    setActive(project)
  }

  function onLeave() {
    setActive(null)
  }

  return (
    <section id="work" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
          <p className="text-sm tracking-[0.18em] uppercase">Selected work</p>
          <p className="text-sm text-ink/50 dark:text-ink-dark/50">{count}</p>
        </div>
      </Reveal>

      <ul>
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06} y={28}>
            <li>
              <Link
                to={`/work/${project.slug}`}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-ink/15 py-7 dark:border-ink-dark/15 sm:grid-cols-[4.5rem_1fr_auto] sm:py-8"
                onMouseMove={(event) => onMove(event, project)}
                onMouseEnter={(event) => onMove(event, project)}
                onMouseLeave={onLeave}
              >
                <span className="text-sm text-ink/45 dark:text-ink-dark/45">
                  {project.id}
                </span>
                <span className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-medium tracking-[-0.04em] transition-opacity duration-300 group-hover:opacity-45">
                  {project.name}
                </span>
                <span className="col-start-2 text-sm text-ink/55 dark:text-ink-dark/55 sm:col-start-auto">
                  {project.tags}
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.slug}
                className="pointer-events-none fixed z-[80] overflow-hidden border border-ink/10 bg-canvas shadow-[0_24px_80px_rgba(0,0,0,0.18)] dark:border-ink-dark/10 dark:bg-canvas-dark"
                style={{
                  left: cursor.x - PREVIEW_WIDTH / 2,
                  top: cursor.y + 28,
                  width: PREVIEW_WIDTH,
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <img
                  src={active.image}
                  alt={active.name}
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
