import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToId } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      anchors: false,
      autoRaf: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
      scrollToId('top', { immediate: true })
      return
    }

    if (location.hash) {
      const id = location.hash.replace('#', '')
      let frame2 = 0
      const frame1 = window.requestAnimationFrame(() => {
        frame2 = window.requestAnimationFrame(() => {
          scrollToId(id)
        })
      })
      return () => {
        window.cancelAnimationFrame(frame1)
        window.cancelAnimationFrame(frame2)
      }
    }

    scrollToId('top', { immediate: true })
  }, [location.pathname, location.hash])

  return children
}
