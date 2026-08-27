import Reveal from './Reveal'
import { steps } from '../lib/content'

export default function Process() {
  return (
    <section id="process" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <p className="mb-14 text-sm tracking-[0.18em] uppercase">Process</p>
      </Reveal>

      <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
        {steps.map((step, index) => (
          <Reveal key={step.id} delay={index * 0.08}>
            <article>
              <p className="text-sm text-ink/45 dark:text-ink-dark/45">{step.id}</p>
              <h3 className="font-display mt-5 text-[1.8rem] font-medium tracking-[-0.04em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
                {step.copy}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
