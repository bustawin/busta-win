import { Post } from '@src/domain/post'
import it from 'iterated'
import { Category } from '@src/domain/category'

export function toJson(post: Post) {
  return {
    ...post,
    categories: it.array(post.categories),
    tags: it.array(post.tags),
  }
}

export function fromJson(raw): Post {
  return {
    ...raw,
    categories: it.set(raw.categories),
    tags: it.set(raw.tags),
  }
}

export function categoriesToSimple(categories: Iterable<Category>): Category[] {
  return it.array(categories)
}
