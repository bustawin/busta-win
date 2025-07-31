import { Plugin } from 'unified'
import { findAndReplace } from 'mdast-util-find-and-replace'

export const ellipsisReplacer: Plugin = () => {
  return function (tree) {
    // @ts-expect-error It seems this is correct
    return findAndReplace(tree, [/(\.\.\.)/g, () => '…'])
  }
}
