import { expect, test } from '@playwright/test'

test.use({ trace: 'off' })

// This E2E suite verifies the externally reachable production server, including
// routing, URL decoding, and static-file middleware. The unit security suite
// separately proves unsafe post IDs are rejected before filesystem or MDX access.
test('does not expose repository or secret files', async ({ request }) => {
  const privatePaths = [
    '/.tunnel.env',
    '/.tunnel.env.example',
    '/package.json',
    '/server.ts',
    '/.git/config',
    '/%2e%2e/.tunnel.env',
    '/..%2f.tunnel.env',
  ]

  for (const path of privatePaths) {
    const response = await request.get(path, { maxRedirects: 0 })

    expect(response.status(), `${path} must not be served`).toBe(404)
    expect(response.headers()['content-type']).toContain('text/html')
  }
})

test('continues to serve intended public files', async ({ request }) => {
  const response = await request.get('/favicon.png')

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toBe('image/png')
})
