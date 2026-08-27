import Reveal from './Reveal'
import { experience, labels } from '../lib/content'

export default function Experience() {
  const count = String(experience.length).padStart(2, '0')

  return (
    <section id="experience" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
          <p className="text-sm tracking-[0.18em] uppercase">{labels.experience}</p>
          <p className="text-sm text-ink/50 dark:text-ink-dark/50">{count}</p>
        </div>
      </Reveal>

      <ul>
        {experience.map((job, index) => (
          <Reveal key={job.id} delay={index * 0.06} y={28}>
            <li className="border-t border-ink/15 py-8 dark:border-ink-dark/15 sm:py-10">
              <div className="grid gap-2 sm:grid-cols-[4.5rem_1fr_auto] sm:items-baseline sm:gap-4">
                <span className="text-sm text-ink/45 dark:text-ink-dark/45">{job.id}</span>
                <div>
                  <h3 className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-medium tracking-[-0.04em]">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-sm text-ink/55 dark:text-ink-dark/55">
                    {job.company} · {job.location}
                  </p>
                </div>
                {job.period ? (
                  <p className="text-sm text-ink/55 dark:text-ink-dark/55 sm:text-right">
                    {job.period}
                  </p>
                ) : null}
              </div>
              {job.summary ? (
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70 sm:ml-[4.5rem]">
                  {job.summary}
                </p>
              ) : null}
              {job.points?.length ? (
                <ul className="mt-5 max-w-xl space-y-2 sm:ml-[4.5rem]">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="pl-4 -indent-4 text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70"
                    >
                      — {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
