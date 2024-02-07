import {
  isPostInCategory,
  Post,
  postChronologicalComparator,
} from '@src/domain/post'
import * as path from 'path'
import it from 'iterated'
import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'
import * as utils from '@src/service/utils'
import { Category } from '@src/domain/category'
import * as postSerializer from '@src/adapters/serializers/post'
import { relativePath } from '@jutils/path'

const POSTS_DIR = relativePath(
  import.meta.url,
  utils.envPro ? '../..' : '../../..',
  'posts'
)
const POST_FILENAME = 'post.md'

export async function posts(category?: Category): Promise<Array<Post>> {
  return it.pipe(
    await readdir(POSTS_DIR),
    it.map.p(post),
    it.async,
    it.await,
    it.filter.p((post) => {
      if (category) return isPostInCategory(post, category)
      return true
    }),
    it.sort.p(postChronologicalComparator)
  )
}

export async function post(id: string): Promise<Post> {
  const filepath = path.join(POSTS_DIR, id, POST_FILENAME)
  const rawPost = await readFile(filepath, 'utf-8')
  const { content, data } = matter(rawPost)
  return postSerializer.load({
    id,
    content,
    ...data,
  } as postSerializer.RawPost)
}
