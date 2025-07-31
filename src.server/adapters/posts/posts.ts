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
import { bundleMDX } from 'mdx-bundler'
import { remarkMdxToc } from 'remark-mdx-toc' // @ts-expect-error We don't have types for this
import remarkHeaderId from 'remark-heading-id'
import remarkMdxImages from 'remark-mdx-images'
import { postIds, POSTS_DIR } from '@src/adapters/posts/postsDir'
import rehypeHighlight from 'rehype-highlight'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import pintora from '@src/adapters/posts/pintora'
import { ellipsisReplacer } from '@src/adapters/posts/post-replacer'

const PUBLIC_DIR = relativePath(
  import.meta.url,
  utils.envPro ? '../client' : '../../../public'
)
const POST_FILENAME = 'post.mdx'

export async function posts(
  category?: Category,
  draft: boolean = false
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
    it.sort(postChronologicalComparator)
  )
}

const cache: Record<Post['id'], number> = {}
const cachedPosts: Record<Post['id'], Post> = {}

export async function post(id: string): Promise<Post> {
  const filepath = path.join(POSTS_DIR, id, POST_FILENAME) // Join normalizes

  if (!filepath.startsWith(POSTS_DIR)) {
    // Avoid people trying to access outside the posts dir
    throw new PostNotFound(id)
  }

  let stats
  try {
    stats = await stat(filepath)
  } catch (error) {
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
  const filepath = path.join(POSTS_DIR, id, POST_FILENAME) // Join normalizes

  let rawPost
  try {
    rawPost = await readFile(filepath, 'utf-8')
  } catch (error) {
    // File doesn't exist or is invalid
    throw new PostNotFound(id)
  }

  const { code, frontmatter } = await bundleMDX({
    source: rawPost,
    cwd: POSTS_DIR,
    globals: {
      '@ui/utils/posts': 'ui',
    },
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        pintora,
        [remarkHeaderId, { defaults: true }],
        remarkMdxToc,
        remarkMdxImages,
        ellipsisReplacer,
      ]
      options.rehypePlugins = [
        [rehypeHighlight, { plainText: ['pintora', 'hero', 'rst'] }],
        rehypeMdxCodeProps,
      ]

      return options
    },
    esbuildOptions: (options) => ({
      ...options,
      outdir: `${PUBLIC_DIR}/posts`,
      loader: {
        ...options.loader,
        '.gif': 'file',
        '.png': 'file',
        '.svg': 'file',
        '.webp': 'file',
        '.jpg': 'file',
      },
      publicPath: '/posts',
      write: true,
    }),
  })

  const [convertedPost] = postSerializer.load({
    id,
    content: code,
    ...frontmatter,
  } as postSerializer.RawPost)
  return convertedPost
}

export class PostNotFound extends Error {
  constructor(id: string) {
    super(`Post with id ${id} doesn't exist.`)
  }
}
