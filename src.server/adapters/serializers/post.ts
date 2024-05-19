import { Post } from '@src/domain/post'
import it from 'iterated'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RawPost = { [K in keyof Post]: any }

export function dump(...posts: Post[]): RawPost[] {
  return posts.map((post) => ({
    ...post,
    created: post.created.toJSON(),
    categories: it.array(post.categories) as string[],
    tags: it.array(post.tags),
  }))
}

export function load(...raw: RawPost[]): Post[] {
  return raw.map(
    (r) =>
      ({
        ...r,
        created: new Date(r.created),
        categories: it.set(r.categories),
        tags: it.set(r.tags),
      } as Post)
  )
}
