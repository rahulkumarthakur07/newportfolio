import { describe, expect, it } from 'vitest'
import { getProjectBySlug, projects } from './content'

describe('projects', () => {
  it('has a unique slug for every project', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(projects.length)
  })

  it('finds a project by slug', () => {
    expect(getProjectBySlug('slotani')?.name).toBe('Slotani')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('missing')).toBeUndefined()
  })
})
