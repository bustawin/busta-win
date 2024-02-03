import { Post } from '@src/domain/post'
import * as path from 'path'
import it from 'iterated'
import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const POSTS_DIR = path.resolve(__dirname, '../../../posts')
const POST_FILENAME = 'post.md'

export async function posts(): Promise<Array<Post>> {
  console.log(it.sort, 'what is it?')
  return it.pipe(
    await readdir(POSTS_DIR),
    it.map.p(post),
    it.async,
    it.await,
    it.array
  )
}

async function post(id: string): Promise<Post> {
  const filepath = path.join(POSTS_DIR, id, POST_FILENAME)
  const rawPost = await readFile(filepath, 'utf-8')
  const matterResult = matter(rawPost)
  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
  } as Post
}
