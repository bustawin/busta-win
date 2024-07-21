import { visit } from 'unist-util-visit'
import { render } from '@pintora/cli'

export default function pintora() {
  return async function transformer(tree) {
    const nodes = []

    visit(tree, 'code', (node) => {
      // Example async operation: simulate async operation with a delay
      if ((node.lang || '').toLowerCase() === 'pintora') {
        nodes.push(node)
      }
    })

    await Promise.all(
      nodes.map(async (node) => {
        const svgString = await render({
          code: node.value,
          mimeType: 'image/svg+xml',
          renderInSubprocess: false,
          backgroundColor: 'transparent',
        })
        // We get an error when setting html, so we set a known type
        // such as code, so we can handle it in React
        // we have the extra of being able to use markdown code title
        node.type = 'code'
        node.value = svgString
      })
    )
    return tree
  }
}
