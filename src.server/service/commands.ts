import { Post } from '@src/domain/post'
import * as posts_adapter from '@src/adapters/posts/posts'

/**
 * Gets the posts chronologically inversely sorted.
 */
export async function posts(): Promise<Post[]> {
  return posts_adapter.posts()
}
