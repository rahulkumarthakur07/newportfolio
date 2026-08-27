import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { labels, site } from '../lib/content'

const empty = {
  name: '',
  email: '',
  project: '',
  message: '',
}

export default function WorkForm({ open, onClose }) {
  const [values, setValues] = useState(empty)

  useEffect(() => {
    if (!open) return

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [open, onClose])

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()

    const subject = encodeURIComponent(`Work inquiry from ${values.name}`)
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nProject: ${values.project || '—'}\n\n${values.message}`,
    )

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setValues(empty)
    onClose()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-90 flex items-end justify-center p-4 sm:items-center sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/45 dark:bg-black/60"
            aria-label="Close form"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-form-title"
            className="relative z-10 w-full max-w-lg bg-canvas text-ink dark:bg-canvas-dark dark:text-ink-dark"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-6 py-5 dark:border-ink-dark/10">
              <div>
                <p className="text-sm tracking-[0.18em] uppercase text-ink/50 dark:text-ink-dark/50">
                  {labels.formEyebrow}
                </p>
                <h2 id="work-form-title" className="font-display mt-2 text-2xl tracking-[-0.04em]">
                  {labels.formTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer text-sm tracking-[-0.01em] text-ink/55 hover:text-ink dark:text-ink-dark/55 dark:hover:text-ink-dark"
              >
                {labels.formClose}
              </button>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4 px-6 py-6">
              <label className="flex flex-col gap-2 text-sm">
                {labels.formName}
                <input
                  required
                  name="name"
                  value={values.name}
                  onChange={update}
                  autoComplete="name"
                  className="border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-ink dark:border-ink-dark/20 dark:focus:border-ink-dark"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                {labels.formEmail}
                <input
                  required
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={update}
                  autoComplete="email"
                  className="border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-ink dark:border-ink-dark/20 dark:focus:border-ink-dark"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                {labels.formProject}
                <input
                  name="project"
                  value={values.project}
                  onChange={update}
                  placeholder={labels.formPlaceholder}
                  className="border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-ink/35 focus:border-ink dark:border-ink-dark/20 dark:placeholder:text-ink-dark/35 dark:focus:border-ink-dark"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                {labels.formMessage}
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={update}
                  className="resize-none border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-ink dark:border-ink-dark/20 dark:focus:border-ink-dark"
                />
              </label>
              <button
                type="submit"
                className="mt-2 cursor-pointer border border-ink bg-ink px-5 py-3 text-[15px] tracking-[-0.01em] text-canvas transition-opacity hover:opacity-80 dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark"
              >
                {labels.formSend}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
