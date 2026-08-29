import { Link } from 'react-router-dom'
import { getProjectImage, labels, projects } from '../lib/content'

export default function WorkPage() {
  const count = String(projects.length).padStart(2, '0')

  return (
    <section className="px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pb-32 lg:pt-36">
      <Link
        to="/#work"
        className="inline-flex text-sm tracking-[-0.01em] text-ink/60 transition-opacity hover:text-ink dark:text-ink-dark/60 dark:hover:text-ink-dark"
      >
        ← {labels.back}
      </Link>

      <div className="mb-12 mt-10 flex items-end justify-between gap-6 lg:mt-14">
        <p className="text-sm tracking-[0.18em] uppercase">{labels.allWork}</p>
        <p className="text-sm text-ink/50 dark:text-ink-dark/50">{count}</p>
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/work/${project.slug}`} className="group block">
              <img
                src={getProjectImage(project)}
                alt={project.name}
                className="aspect-[4/3] w-full border border-ink/10 object-cover transition-opacity duration-300 group-hover:opacity-75 dark:border-ink-dark/10"
              />
              <p className="mt-4 text-sm text-ink/45 dark:text-ink-dark/45">{project.id}</p>
              <h2 className="font-display mt-2 text-[1.4rem] font-medium tracking-[-0.03em]">
                {project.name}
              </h2>
              <p className="mt-2 text-sm text-ink/55 dark:text-ink-dark/55">{project.tags}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
