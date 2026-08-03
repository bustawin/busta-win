import type { ImportDeclaration } from 'estree'
import type { Root } from 'mdast'
import type { MdxJsxTextElement } from 'mdast-util-mdx'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const urlPattern = /^(https?:)?\//
const relativePathPattern = /\.\.?\//

const remarkMdxImages: Plugin<[], Root> = () => (ast) => {
  const imports: ImportDeclaration[] = []
  const imported = new Map<string, string>()

  visit(ast, 'image', (node, index, parent) => {
    const { alt = null, title } = node
    let url = decodeURIComponent(node.url)
    if (urlPattern.test(url)) return
    if (!relativePathPattern.test(url)) url = `./${url}`

    let name = imported.get(url)
    if (!name) {
      name = `__${imported.size}_${url.replaceAll(/\W/g, '_')}__`
      imports.push({
        type: 'ImportDeclaration',
        source: { type: 'Literal', value: url },
        specifiers: [
          {
            type: 'ImportDefaultSpecifier',
            local: { type: 'Identifier', name },
          },
        ],
        attributes: [],
      })
      imported.set(url, name)
    }

    const textElement: MdxJsxTextElement = {
      type: 'mdxJsxTextElement',
      name: 'img',
      children: [],
      attributes: [
        { type: 'mdxJsxAttribute', name: 'alt', value: alt },
        {
          type: 'mdxJsxAttribute',
          name: 'src',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: name,
            data: {
              estree: {
                type: 'Program',
                sourceType: 'module',
                comments: [],
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: { type: 'Identifier', name },
                  },
                ],
              },
            },
          },
        },
      ],
    }
    if (title) {
      textElement.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'title',
        value: title,
      })
    }
    parent!.children.splice(index!, 1, textElement)
  })

  if (imports.length) {
    ast.children.unshift({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: imports,
        },
      },
    })
  }
}

export default remarkMdxImages
