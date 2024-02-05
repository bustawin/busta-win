import { Post } from '@src/domain/post'
import it from 'iterated'
import { Category } from '@src/domain/category'

// We are converting values and we don't need the typing to be perfect within the functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RawPost = { [K in keyof Post]: any }

export function toJson(...posts: [Post]): RawPost
export function toJson(...posts: Post[]): RawPost[]
export function toJson(...posts: Post[]): RawPost | RawPost[] {
  const converted = posts.map((post) => ({
    ...post,
    created: post.created.toJSON(),
    categories: it.array(post.categories) as string[],
    tags: it.array(post.tags),
  }))
  return posts.length == 1 ? converted[0] : converted
}

export function fromJson(...raw: [RawPost]): Post
export function fromJson(...raw: RawPost[]): Post[]
export function fromJson(...raw: RawPost[]): Post | Post[] {
  const converted = raw.map(
    (r) =>
      ({
        ...r,
        created: new Date(r.created),
        categories: it.set(r.categories),
        tags: it.set(r.tags),
      } as Post)
  )
  return converted.length == 1 ? converted[0] : converted
}

export function categoriesToSimple(categories: Iterable<Category>): Category[] {
  return it.array(categories)
}
