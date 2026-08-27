import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12">
      <p className="text-sm tracking-[0.18em] uppercase text-ink/45 dark:text-ink-dark/45">
        Page not found
      </p>
      <h1 className="font-display mt-4 font-bold tracking-[-0.05em]">
        <span className="block text-[clamp(5rem,18vw,14rem)] leading-[0.85]">404</span>
      </h1>
      <p className="mt-8 max-w-md text-[16px] leading-relaxed text-ink/70 dark:text-ink-dark/70">
        This page doesn’t exist — or it moved. Head home and keep looking around.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center border border-ink bg-ink px-5 py-2.5 text-[14px] tracking-[-0.01em] text-canvas transition-opacity hover:opacity-80 dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark"
        >
          Back home
        </Link>
        <Link
          to="/#work"
          className="inline-flex items-center border border-current px-5 py-2.5 text-[14px] tracking-[-0.01em] transition-colors hover:bg-ink hover:text-canvas dark:hover:bg-ink-dark dark:hover:text-canvas-dark"
        >
          View work
        </Link>
      </div>
    </section>
  )
}
