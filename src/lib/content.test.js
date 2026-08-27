import { describe, expect, it } from 'vitest'
import {
  experience,
  getProjectBySlug,
  nav,
  nextRoleIndex,
  projects,
  roles,
  site,
  skillGroups,
  steps,
} from './content'

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

describe('hero roles', () => {
  it('includes every requested title', () => {
    const titles = roles.map((role) => `${role.line1} ${role.line2}`)

    expect(titles).toEqual([
      'Software Engineer',
      'Full Stack Developer',
      'Mobile App Developer',
      'AI Engineer',
      'UI / UX Designer',
    ])
  })

  it('cycles to the first title after the last one', () => {
    expect(nextRoleIndex(0, 5)).toBe(1)
    expect(nextRoleIndex(4, 5)).toBe(0)
  })
})

describe('site content', () => {
  it('has social links and navigation', () => {
    expect(typeof site.showContactNote).toBe('boolean')
    expect(site.socials.map((item) => item.label)).toEqual(['GitHub', 'LinkedIn', 'X'])
    expect(nav.map((item) => item.hash)).toContain('experience')
    expect(experience.map((job) => job.company)).toEqual([
      'ALTISE Technologies',
      'Fiverr',
    ])
    expect(skillGroups.length).toBeGreaterThan(0)
    expect(steps.length).toBeGreaterThan(0)
  })
})
