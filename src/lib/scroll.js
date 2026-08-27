const HEADER_OFFSET = -88

export function scrollToId(id, { immediate = false } = {}) {
  const lenis = window.__lenis
  const target = !id || id === 'top' ? 0 : document.getElementById(id)

  if (target == null && id && id !== 'top') return

  if (!lenis) {
    if (target) {
      target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' })
      return
    }
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
    return
  }

  lenis.scrollTo(target ?? 0, {
    offset: target ? HEADER_OFFSET : 0,
    immediate,
    duration: 1.25,
  })
}
