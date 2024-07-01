import { Category } from '@src/domain/category'

export type Post = {
  id: string
  title: string
  content: string
  categories: Set<Category>
  tags: Set<string>
  summary: string
  created: Date
  image?: string
  js?: boolean
}

/**
 * The way we want to sort posts, which is chronologically inverse.
 */
export function postChronologicalComparator(a: Post, b: Post): number {
  return a.created < b.created ? 1 : -1
}

export function isPostInCategory(post: Post, category: Category): boolean {
  return post.categories.has(category)
}
