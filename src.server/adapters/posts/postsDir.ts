import { relativePath } from '@jutils/path'
import * as utils from '@src/service/utils'
import { readdir } from 'fs/promises'

export const POSTS_DIR = relativePath(
  import.meta.url,
  utils.envPro ? '../..' : '../../..',
  'posts'
)

export async function postIds() {
  return await readdir(POSTS_DIR)
}
