import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nextRoleIndex, roles, site } from '../lib/content'

const lineTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1],
}

const line1Class = 'whitespace-nowrap text-[clamp(2.6rem,10.5vw,10.5rem)]'
const line2Class = 'whitespace-nowrap text-[clamp(3.2rem,12.4vw,12.2rem)]'
const line1Sizers = [...new Set(roles.map((role) => role.line1))]
const line2Sizers = [...new Set(roles.map((role) => role.line2))]

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

function TitleSlot({ text, className, delay = 0, sizers, slotKey }) {
  return (
    <span className="relative grid w-max justify-items-start">
      {sizers.map((sizer) => (
        <span
          key={sizer}
          aria-hidden="true"
          className={`invisible col-start-1 row-start-1 block py-[0.16em] leading-[0.95] ${className}`}
        >
          {sizer}
        </span>
      ))}
      <span className="absolute inset-0">
        <AnimatePresence mode="wait">
          <HeroLine key={slotKey} text={text} className={className} delay={delay} />
        </AnimatePresence>
      </span>
    </span>
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
        <TitleSlot
          text={role.line1}
          className={line1Class}
          sizers={line1Sizers}
          slotKey={index}
        />

        <span className="-mt-[0.3em] flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-10">
          <TitleSlot
            text={role.line2}
            className={line2Class}
            delay={0.08}
            sizers={line2Sizers}
            slotKey={index}
          />
          <span className="flex w-[16.5rem] shrink-0 flex-col items-start gap-4 pb-3 font-normal sm:pb-5 lg:pb-7">
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center border border-current px-5 py-2 text-[14px] tracking-[-0.01em] transition-colors duration-200 hover:bg-ink hover:text-canvas dark:hover:bg-ink-dark dark:hover:text-canvas-dark"
            >
              {site.resumeLabel}
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
