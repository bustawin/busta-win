import {
  isPostInCategory,
  Post,
  postChronologicalComparator,
} from '@src/domain/post'
import * as path from 'path'
import it from 'iterated'
import { readdir, readFile } from 'fs/promises'
import * as utils from '@src/service/utils'
import { Category } from '@src/domain/category'
import * as postSerializer from '@src/adapters/serializers/post'
import { relativePath } from '@jutils/path'
import { bundleMDX } from 'mdx-bundler'
import { remarkMdxToc } from 'remark-mdx-toc'
// @ts-expect-error We don't have types for this
import remarkHeaderId from 'remark-heading-id'

const POSTS_DIR = relativePath(
  import.meta.url,
  utils.envPro ? '../..' : '../../..',
  'posts'
)
const POST_FILENAME = 'post.mdx'

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
  const { code, frontmatter } = await bundleMDX({
    source: rawPost,
    globals: {
      '@ui/utils/posts': 'ui',
    },
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkHeaderId, { defaults: true }],
        remarkMdxToc,
      ]

      return options
    },
  })

  return postSerializer.load({
    id,
    content: code,
    ...frontmatter,
  } as postSerializer.RawPost)
}
