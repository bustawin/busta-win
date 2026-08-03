import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  // Avoid real MDX compilation and its generated-file side effects.
  bundleMDX: vi.fn(),
  // Avoid reading real posts and prove rejected IDs never reach file contents.
  readFile: vi.fn(),
  // Prove rejected IDs never reach filesystem metadata access.
  stat: vi.fn(),
}))

vi.mock('fs/promises', async (importOriginal) => ({
  ...(await importOriginal<typeof import('fs/promises')>()),
  readFile: mocks.readFile,
  stat: mocks.stat,
}))

vi.mock('mdx-bundler', () => ({ bundleMDX: mocks.bundleMDX }))

import { post, PostNotFound } from '@src/adapters/posts/posts'
import { POSTS_DIR } from '@src/adapters/posts/postsDir'

// This unit suite proves unsafe post IDs are rejected before filesystem or MDX
// access. The E2E security suite separately verifies that routing, URL decoding,
// and static-file middleware do not expose private files over HTTP.
describe('post path security', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads a post from a direct child of the posts directory', async () => {
    mocks.stat.mockResolvedValue({ mtimeMs: 1 })
    mocks.readFile.mockResolvedValue('post source')
    mocks.bundleMDX.mockResolvedValue({
      code: 'compiled post',
      frontmatter: {
        categories: ['software'],
        created: '2024-07-27',
        summary: 'Post summary',
        tags: ['testing'],
        title: 'Post title',
      },
    })

    await expect(post('valid-post')).resolves.toMatchObject({
      id: 'valid-post',
      title: 'Post title',
    })
    expect(mocks.stat).toHaveBeenCalledWith(
      path.join(POSTS_DIR, 'valid-post', 'post.mdx')
    )
    expect(mocks.readFile).toHaveBeenCalledWith(
      path.join(POSTS_DIR, 'valid-post', 'post.mdx'),
      'utf-8'
    )
  })

  it.each([
    '',
    '.',
    '..',
    '../../.tunnel.env',
    '../posts-secret',
    '/etc',
    'nested/post',
    'nested\\post',
    'post\0name',
  ])('rejects the invalid post id %j before accessing files', async (id) => {
    await expect(post(id)).rejects.toBeInstanceOf(PostNotFound)
    expect(mocks.stat).not.toHaveBeenCalled()
    expect(mocks.readFile).not.toHaveBeenCalled()
    expect(mocks.bundleMDX).not.toHaveBeenCalled()
  })
})
