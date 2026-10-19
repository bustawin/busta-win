import { mkdtemp, readdir, rm, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import * as path from 'path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { getMDXExport } from 'mdx-bundler/client'
import { afterEach, describe, expect, it } from 'vitest'
import { compileMdx } from '@src/adapters/mdx/compile'

const temporaryDirectories: string[] = []

async function createTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), 'mdx-compile-'))
  temporaryDirectories.push(directory)
  return directory
}

afterEach(async () => {
  const directories = temporaryDirectories.splice(0)
  await Promise.all(
    directories.map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  )
})

describe('compileMdx', () => {
  it('returns the parsed frontmatter', async () => {
    const cwd = await createTemporaryDirectory()

    const { frontmatter } = await compileMdx({
      cwd,
      source: [
        '---',
        'title: A compiled post',
        'draft: false',
        '---',
        '',
        '# Body',
      ].join('\n'),
    })

    expect(frontmatter).toMatchObject({
      title: 'A compiled post',
      draft: false,
    })
  })

  it('bundles and executes a local tsx import', async () => {
    const cwd = await createTemporaryDirectory()
    await writeFile(
      path.join(cwd, 'local.tsx'),
      [
        'export default function Local() {',
        '  return <span>local component</span>',
        '}',
      ].join('\n'),
    )

    const { code } = await compileMdx({
      cwd,
      source: ["import Local from './local'", '', '<Local />'].join('\n'),
    })
    const Content = getMDXExport(code).default

    expect(renderToStaticMarkup(createElement(Content))).toContain(
      'local component',
    )
  })

  it('emits relative images and references the configured public path', async () => {
    const cwd = await createTemporaryDirectory()
    const assetsDirectory = path.join(cwd, 'assets')
    await writeFile(path.join(cwd, 'image.png'), Buffer.from('image bytes'))

    const { code } = await compileMdx({
      cwd,
      source: '![Alt text](./image.png)',
      assets: { directory: assetsDirectory, publicPath: '/assets' },
    })

    const assetFiles = await readdir(assetsDirectory)
    expect(assetFiles.some((file) => file.endsWith('.png'))).toBe(true)
    expect(code).toMatch(/\/assets\/[^"']+\.png/)
  })
})
