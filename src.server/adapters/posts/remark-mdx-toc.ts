import { valueToEstree } from 'estree-util-value-to-estree'
import { toString } from 'mdast-util-to-string'
import type { Heading, Root, RootContent } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export interface TocEntry {
  depth: number
  value: string
  attributes: Record<string, unknown>
  children: TocEntry[]
}

const remarkMdxToc: Plugin<[], Root> = () => (tree) => {
  const toc: TocEntry[] = []
  const flatToc: TocEntry[] = []

  visit(tree, 'heading', (node: Heading) => {
    const entry: TocEntry = {
      depth: node.depth,
      value: toString(node, { includeImageAlt: false }),
      attributes: { ...node.data },
      children: [],
    }
    flatToc.push(entry)

    let parent = toc
    for (let index = flatToc.length - 2; index >= 0; index -= 1) {
      const candidate = flatToc[index]
      if (candidate.depth < entry.depth) {
        parent = candidate.children
        break
      }
    }
    parent.push(entry)
  })

  const tocExport = {
    type: 'mdxjsEsm',
    value: `export const toc = ${JSON.stringify(toc)}`,
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            source: null,
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: 'toc' },
                  init: valueToEstree(toc),
                },
              ],
            },
          },
        ],
      },
    },
  } as unknown as RootContent

  tree.children.unshift(tocExport)
}

export default remarkMdxToc
