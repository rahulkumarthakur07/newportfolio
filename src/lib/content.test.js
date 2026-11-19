import { describe, expect, it } from 'vitest'
import {
  experience,
  getOtherProjects,
  getProjectBySlug,
  getProjectImage,
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
    expect(getProjectBySlug('prepswipe')?.name).toBe('PrepSwipe')
  })

  it('lists Recipe Mobile App as a React Native Expo app', () => {
    const project = getProjectBySlug('recipe-mobile-app')
    expect(project?.tags).toContain('React Native')
    expect(project?.tech).toEqual(
      expect.arrayContaining(['React Native', 'Expo', 'Expo Router']),
    )
    expect(project?.demo).toContain('recepieapp.apk')
    expect(project?.github).toContain('RecepieApp')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('missing')).toBeUndefined()
  })

  it('returns every project except the current one', () => {
    const others = getOtherProjects('prepswipe')
    expect(others.map((project) => project.slug)).toEqual([
      'recipe-mobile-app',
      'yetiwise',
      'animated-website',
      'bakery-website',
      'school-management-app',
      'restromvp',
      'tasknebula',
    ])
  })

  it('uses separate detail and hover images, including remote links', () => {
    const bakery = getProjectBySlug('bakery-website')
    expect(getProjectImage(bakery)).toBe(bakery.image)
    expect(getProjectImage(bakery, 'hover')).toBe(bakery.hoverImage)

    const remote = {
      image: 'https://example.com/detail.png',
      hoverImage: 'https://example.com/hover.png',
    }
    expect(getProjectImage(remote)).toBe('https://example.com/detail.png')
    expect(getProjectImage(remote, 'hover')).toBe('https://example.com/hover.png')
    expect(getProjectImage({ hoverImage: 'https://example.com/only-hover.png' })).toBe(
      'https://example.com/only-hover.png',
    )
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
