import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nextRoleIndex, roles } from '../lib/roles'
import { site } from '../lib/content'

const lineTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1],
}

function HeroLine({ text, className, delay = 0 }) {
  return (
    <motion.span
      className="block overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <motion.span
        className={`block py-[0.16em] leading-[0.95] ${className}`}
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        exit={{ y: '-108%' }}
        transition={{ ...lineTransition, delay }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const role = roles[index]

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => nextRoleIndex(current))
    }, 3200)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16"
    >
      <h1
        className="font-display font-bold tracking-[-0.045em] text-ink dark:text-ink-dark"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <HeroLine
            key={`line1-${index}`}
            text={role.line1}
            className="text-[clamp(2.6rem,10.5vw,10.5rem)]"
          />
        </AnimatePresence>

        <span className="-mt-[0.3em] flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-10">
          <AnimatePresence mode="wait">
            <HeroLine
              key={`line2-${index}`}
              text={role.line2}
              delay={0.08}
              className="text-[clamp(3.2rem,12.4vw,12.2rem)]"
            />
          </AnimatePresence>
          <span className="flex max-w-[16.5rem] flex-col items-start gap-4 pb-3 font-normal sm:pb-5 lg:pb-7">
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center border border-current px-5 py-2 text-[14px] tracking-[-0.01em] transition-colors duration-200 hover:bg-ink hover:text-canvas dark:hover:bg-ink-dark dark:hover:text-canvas-dark"
            >
              View Resume
            </a>
            <p className="text-[15px] leading-[1.45] tracking-normal">
              {site.heroSupport}
            </p>
          </span>
        </span>
      </h1>
    </section>
  )
}
