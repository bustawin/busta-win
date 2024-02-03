export type Post = {
  id: string
  title: string
  content: string
  categories: string[]
  tags: string[]
  summary: string
  created: Date
}

export function postChronologicalComparator(a: Post, b: Post) {
  return a.created <= b.created
}
