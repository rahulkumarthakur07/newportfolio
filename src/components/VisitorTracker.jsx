import { useEffect, useRef } from 'react'
import { finishVisit, startVisit } from '../lib/visits'

export default function VisitorTracker() {
  const startedAt = useRef(0)
  const ready = useRef(false)

  useEffect(() => {
    if (window.location.pathname.startsWith('/analytics')) return undefined

    startedAt.current = Date.now()
    let active = true

    async function boot() {
      const id = await startVisit()
      if (!active || !id) return
      ready.current = true
    }

    boot()

    function flush() {
      if (!ready.current) return
      finishVisit(Date.now() - startedAt.current)
    }

    function onVisibility() {
      if (document.visibilityState === 'hidden') flush()
    }

    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      active = false
      flush()
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return null
}
