import it from 'iterated'

export type Category = 'Software' | 'Research' | 'Management'
export const categories = it.set([
  'software',
  'research',
  'management',
]) as Set<Category>

export function isCategory(val: unknown): val is Category {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return categories.has(val)
}
