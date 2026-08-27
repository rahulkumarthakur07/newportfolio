import { beforeEach, describe, expect, it, vi } from 'vitest'
import { applyTheme, getInitialTheme, nextTheme } from './theme'

describe('theme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('uses a stored theme over system preference', () => {
    window.localStorage.setItem('theme', 'dark')
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })

    expect(getInitialTheme()).toBe('dark')
  })

  it('falls back to the system preference when nothing is stored', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })

    expect(getInitialTheme()).toBe('dark')
  })

  it('toggles between light and dark', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })

  it('applies the dark class and persists the choice', () => {
    applyTheme('dark')

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })
})
