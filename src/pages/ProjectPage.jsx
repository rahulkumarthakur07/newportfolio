import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, labels } from '../lib/content'
import NotFound from './NotFound'

function ExternalButton({ href, children, filled = false }) {
  const hasLink = Boolean(href)
  const className = filled
    ? 'inline-flex items-center justify-center border border-ink bg-ink px-5 py-2.5 text-[14px] tracking-[-0.01em] text-canvas transition-opacity hover:opacity-80 dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark'
    : 'inline-flex items-center justify-center border border-current px-5 py-2.5 text-[14px] tracking-[-0.01em] transition-colors hover:bg-ink hover:text-canvas dark:hover:bg-ink-dark dark:hover:text-canvas-dark'

  if (!hasLink) {
    return (
      <span className={`${className} cursor-not-allowed opacity-45`} aria-disabled="true">
        {children}
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFound />
  }

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pb-32 lg:pt-36">
      <Link
        to="/#work"
        className="inline-flex text-sm tracking-[-0.01em] text-ink/60 transition-opacity hover:text-ink dark:text-ink-dark/60 dark:hover:text-ink-dark"
      >
        ← {labels.workBack}
      </Link>

      <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <motion.img
          src={project.image}
          alt={project.name}
          className="aspect-[4/3] w-full border border-ink/10 object-cover dark:border-ink-dark/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div>
          <p className="text-sm text-ink/45 dark:text-ink-dark/45">{project.id}</p>
          <h1 className="font-display mt-3 text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {project.name}
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalButton href={project.demo} filled>
              {labels.liveDemo}
            </ExternalButton>
            <ExternalButton href={project.github}>{labels.github}</ExternalButton>
          </div>

          <p className="mt-10 text-sm tracking-[0.18em] uppercase">{labels.techStack}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="border border-ink/20 px-3 py-1.5 text-[13px] tracking-[-0.01em] dark:border-ink-dark/20"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 grid gap-12 border-t border-ink/15 pt-12 dark:border-ink-dark/15 md:grid-cols-2 lg:mt-24 lg:gap-20">
        <div>
          <p className="text-sm tracking-[0.18em] uppercase">{labels.built}</p>
          <ul className="mt-5 space-y-3 text-[16px] leading-relaxed">
            {project.built.map((item) => (
              <li key={item} className="pl-4 -indent-4">
                — {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm tracking-[0.18em] uppercase">{labels.challenge}</p>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/75 dark:text-ink-dark/75">
            {project.challenge}
          </p>
        </div>
      </div>
    </article>
  )
}
