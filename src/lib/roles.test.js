import { describe, expect, it } from 'vitest'
import { nextRoleIndex, roles } from './roles'

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
