import Reveal from './Reveal'
import { site } from '../lib/content'

export default function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-16 lg:gap-24">
        <Reveal>
          <p className="text-sm tracking-[0.18em] uppercase">About</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display max-w-3xl text-[clamp(1.7rem,3.4vw,3.1rem)] font-medium leading-[1.18] tracking-[-0.035em]">
            {site.aboutHeadline}
          </h2>
          <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
            {site.aboutBody}
          </p>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
            {site.aboutNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
