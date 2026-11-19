import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { submitContact } from '../lib/contacts'
import { labels } from '../lib/content'

const empty = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function WorkForm({ open, onClose }) {
  const [values, setValues] = useState(empty)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return

    const onKey = (event) => {
      if (event.key === 'Escape' && status !== 'sending') onClose()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [open, onClose, status])

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleClose() {
    if (status === 'sending') return
    setStatus('idle')
    setError('')
    setValues(empty)
    onClose()
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setError('')

    try {
      await submitContact(values)
      setValues(empty)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Could not send. Please try again.')
    }
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
            onClick={handleClose}
            disabled={status === 'sending'}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
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
                <h2
                  id="contact-form-title"
                  className="font-display mt-2 text-2xl tracking-[-0.04em]"
                >
                  {status === 'success' ? labels.formSuccessTitle : labels.formTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer text-sm tracking-[-0.01em] text-ink/55 hover:text-ink dark:text-ink-dark/55 dark:hover:text-ink-dark"
              >
                {labels.formClose}
              </button>
            </div>

            {status === 'success' ? (
              <div className="px-6 py-10">
                <p className="text-[16px] leading-relaxed text-ink/75 dark:text-ink-dark/75">
                  {labels.formSuccessBody}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-8 cursor-pointer border border-ink bg-ink px-5 py-3 text-[15px] tracking-[-0.01em] text-canvas transition-opacity hover:opacity-80 dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark"
                >
                  {labels.formDone}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4 px-6 py-6">
                <label className="flex flex-col gap-2 text-sm">
                  {labels.formName}
                  <input
                    required
                    name="name"
                    value={values.name}
                    onChange={update}
                    autoComplete="name"
                    disabled={status === 'sending'}
                    className="border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-ink disabled:opacity-60 dark:border-ink-dark/20 dark:focus:border-ink-dark"
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
                    disabled={status === 'sending'}
                    className="border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-ink disabled:opacity-60 dark:border-ink-dark/20 dark:focus:border-ink-dark"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  {labels.formSubject}
                  <input
                    required
                    name="subject"
                    value={values.subject}
                    onChange={update}
                    placeholder={labels.formSubjectPlaceholder}
                    disabled={status === 'sending'}
                    className="border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-ink/35 focus:border-ink disabled:opacity-60 dark:border-ink-dark/20 dark:placeholder:text-ink-dark/35 dark:focus:border-ink-dark"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  {labels.formDescription}
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={update}
                    placeholder={labels.formDescriptionPlaceholder}
                    disabled={status === 'sending'}
                    className="resize-none border border-ink/20 bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-ink/35 focus:border-ink disabled:opacity-60 dark:border-ink-dark/20 dark:placeholder:text-ink-dark/35 dark:focus:border-ink-dark"
                  />
                </label>
                {error ? (
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 cursor-pointer border border-ink bg-ink px-5 py-3 text-[15px] tracking-[-0.01em] text-canvas transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60 dark:border-ink-dark dark:bg-ink-dark dark:text-canvas-dark"
                >
                  {status === 'sending' ? labels.formSending : labels.formSend}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
