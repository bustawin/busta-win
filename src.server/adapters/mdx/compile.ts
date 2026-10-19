import { bundleMDX } from 'mdx-bundler'
import rehypeHighlight from 'rehype-highlight'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import remarkHeaderId from 'remark-heading-id'
import type { PluggableList } from 'unified'
import remarkMdxImages from '../posts/remark-mdx-images'
import remarkMdxToc from '../posts/remark-mdx-toc'
import { ellipsisReplacer } from '../posts/post-replacer'

export interface CompileMdxOptions {
  source: string
  cwd: string
  assets?: { directory: string; publicPath: string }
  globals?: Record<string, string>
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
}

export interface CompileMdxResult {
  code: string
  frontmatter: Record<string, unknown>
}

/**
 * Compiles MDX into a self-contained script using the shared transforms.
 *
 * Relative media can be emitted to an asset directory by passing `assets`.
 * Without it, the bundle stays in memory and media imports remain unavailable.
 */
export async function compileMdx({
  source,
  cwd,
  assets,
  globals = {},
  remarkPlugins = [],
  rehypePlugins = [],
}: CompileMdxOptions): Promise<CompileMdxResult> {
  const { code, frontmatter } = await bundleMDX<Record<string, unknown>>({
    source,
    cwd,
    globals,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
        [remarkHeaderId, { defaults: true }],
        remarkMdxToc,
        remarkMdxImages,
        ellipsisReplacer,
      ]
      options.rehypePlugins = [
        [rehypeHighlight, { plainText: ['pintora', 'hero', 'rst'] }],
        rehypeMdxCodeProps,
        ...rehypePlugins,
      ]

      return options
    },
    ...(assets
      ? {
          esbuildOptions(options) {
            return {
              ...options,
              outdir: assets.directory,
              loader: {
                ...options.loader,
                '.gif': 'file',
                '.png': 'file',
                '.svg': 'file',
                '.webp': 'file',
                '.jpg': 'file',
                '.jpeg': 'file',
                '.avif': 'file',
              },
              publicPath: assets.publicPath,
              write: true,
            }
          },
        }
      : {}),
  })

  return { code, frontmatter }
}
