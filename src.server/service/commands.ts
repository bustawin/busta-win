import { Post } from '@src/domain/post'
import * as posts_adapter from '@src/adapters/posts/posts'
import * as cat from '@src/domain/category'

/**
 * Gets the posts chronologically inversely sorted.
 */
export async function posts(category?: cat.Category): Promise<Post[]> {
  return posts_adapter.posts(category)
}

export async function post(id: string): Promise<Post> {
  return posts_adapter.post(id)
}

export function categories(): Iterable<cat.Category> {
  return cat.categories
}
