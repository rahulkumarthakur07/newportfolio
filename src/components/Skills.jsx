import Reveal from './Reveal'
import { labels, skillGroups } from '../lib/content'

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <p className="mb-14 text-sm tracking-[0.18em] uppercase">{labels.skills}</p>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-12 xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.06}>
            <p className="text-sm text-ink/45 dark:text-ink-dark/45">{group.label}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-display text-[1.15rem] tracking-[-0.03em]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
