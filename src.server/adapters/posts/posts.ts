import {
  isPostInCategory,
  Post,
  postChronologicalComparator,
} from '@src/domain/post'
import * as path from 'path'
import it from 'iterated'
import { readFile, stat } from 'fs/promises'
import * as utils from '@src/service/utils'
import { Category } from '@src/domain/category'
import * as postSerializer from '@src/adapters/serializers/post'
import { relativePath } from '@jutils/path'
import { compileMdx } from '@src/adapters/mdx/compile'
import { postIds, POSTS_DIR } from '@src/adapters/posts/postsDir'
import pintora from '@src/adapters/posts/pintora'

const PUBLIC_DIR = relativePath(
  import.meta.url,
  utils.envPro ? '../client' : '../../../public',
)
const POST_FILENAME = 'post.mdx'

export async function posts(
  category?: Category,
  draft: boolean = false,
): Promise<Array<Post>> {
  return it.pipe(
    await postIds(),
    it.map(post),
    it.await,
    it.filter((post) => {
      if (post.id.startsWith('_')) return false
      if (!draft && post.draft) return false
      if (category) return isPostInCategory(post, category)
      return true
    }),
    it.sort(postChronologicalComparator),
  )
}

const cache: Record<Post['id'], number> = {}
const cachedPosts: Record<Post['id'], Post> = {}

export async function post(id: string): Promise<Post> {
  const filepath = postFilepath(id)

  let stats
  try {
    stats = await stat(filepath)
  } catch {
    // File doesn't exist or is invalid
    throw new PostNotFound(id)
  }

  if (cache[id] === stats.mtimeMs) {
    return cachedPosts[id]
  } else {
    cachedPosts[id] = await _post(id)
    cache[id] = stats.mtimeMs
    return cachedPosts[id]
  }
}

export async function _post(id: string): Promise<Post> {
  const filepath = postFilepath(id)

  let rawPost
  try {
    rawPost = await readFile(filepath, 'utf-8')
  } catch {
    // File doesn't exist or is invalid
    throw new PostNotFound(id)
  }

  const { code, frontmatter } = await compileMdx({
    source: rawPost,
    cwd: POSTS_DIR,
    assets: {
      directory: path.join(PUBLIC_DIR, 'posts'),
      publicPath: '/posts',
    },
    globals: {
      '@ui/utils/posts': 'ui',
    },
    remarkPlugins: [pintora],
  })

  const [convertedPost] = postSerializer.load({
    id,
    content: code,
    ...frontmatter,
  } as postSerializer.RawPost)
  return convertedPost
}

function postFilepath(id: string): string {
  const filepath = path.join(POSTS_DIR, id, POST_FILENAME)
  const relativeFilepath = path.relative(POSTS_DIR, filepath)

  if (
    relativeFilepath === '..' ||
    relativeFilepath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeFilepath)
  ) {
    throw new PostNotFound(id)
  }

  return filepath
}

export class PostNotFound extends Error {
  constructor(id: string) {
    super(`Post with id ${id} doesn't exist.`)
  }
}
