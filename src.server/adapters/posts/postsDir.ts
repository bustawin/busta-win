import { relativePath } from '@jutils/path'
import * as utils from '@src/service/utils'
import { readdir } from 'fs/promises'
import it from 'iterated'

export const POSTS_DIR = relativePath(
  import.meta.url,
  utils.envPro ? '../..' : '../../..',
  'posts'
)

export async function postIds() {
  const contents = await readdir(POSTS_DIR, { withFileTypes: true })
  return it.pipe(
    contents,
    it.filter((content) => content.isDirectory()),
    it.map(({ name }) => name)
  )
}
