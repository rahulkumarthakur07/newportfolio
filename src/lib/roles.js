export const roles = [
  { line1: 'Software', line2: 'Engineer' },
  { line1: 'Full Stack', line2: 'Developer' },
  { line1: 'Mobile App', line2: 'Developer' },
  { line1: 'AI', line2: 'Engineer' },
  { line1: 'UI / UX', line2: 'Designer' },
]

export function nextRoleIndex(index, length = roles.length) {
  return (index + 1) % length
}
