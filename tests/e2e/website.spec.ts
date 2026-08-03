import { expect, test } from '@playwright/test'

const planningPost = 'Planning effective meetings'
const buildingPost =
  'busta.win: a self-hosted blog built with React Remix using the Edge'

test('lists published posts and filters them by category', async ({ page }) => {
  const response = await page.goto('/')

  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('bustawin')
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.getByRole('heading', { name: planningPost })).toBeVisible()
  await expect(page.getByRole('heading', { name: buildingPost })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Prose style in this blog' }),
  ).toHaveCount(0)

  const titles = await page.locator('.post-preview__title').allTextContents()
  expect(titles.indexOf(planningPost)).toBeLessThan(
    titles.indexOf(buildingPost),
  )

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Manage', exact: true })
    .click()
  await expect(page).toHaveURL('/categories/manage')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Manage' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: planningPost })).toBeVisible()
  await expect(page.getByRole('heading', { name: buildingPost })).toHaveCount(0)
})

test('renders a post after client-side navigation', async ({ page }) => {
  const pageErrors: Error[] = []
  const consoleErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.goto('/')
  await page.getByRole('link', { name: buildingPost }).click()

  await expect(page).toHaveURL('/posts/building-blog')
  await expect(page).toHaveTitle(buildingPost)
  await expect(
    page.getByRole('heading', { level: 1, name: buildingPost }),
  ).toBeVisible()
  await expect(page.locator('article.post')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'What I want for my personal website' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'What I want for my personal website' }),
  ).toHaveAttribute(
    'href',
    '/posts/building-blog#what-i-want-for-my-personal-website',
  )
  await expect(page.getByText('Table of contents')).toBeVisible()
  await expect(page.locator('.post__figure--pintora svg')).toBeVisible()
  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test('renders interactive Plotly graphs', async ({ page }) => {
  const pageErrors: Error[] = []
  page.on('pageerror', (error) => pageErrors.push(error))

  const response = await page.goto('/posts/interorg-network')

  expect(response?.status()).toBe(200)
  await expect(page.locator('.js-plotly-plot')).toHaveCount(2)
  await expect(page.locator('.js-plotly-plot').first()).toBeVisible()
  expect(pageErrors).toEqual([])
})

test('keeps drafts out of listings but allows a noindex preview', async ({
  page,
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('link', { name: 'Prose style in this blog' }),
  ).toHaveCount(0)

  const response = await page.goto('/posts/prose-style')

  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('Prose style in this blog')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  )
})

test('renders the error page with a working way home', async ({ page }) => {
  for (const path of ['/posts/not-a-post', '/categories/not-a-category']) {
    const response = await page.goto(path)

    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole('heading', { level: 1, name: 'A dramatic short story' }),
    ).toBeVisible()
    await expect(page.getByText('HTTP 404, page not found.')).toBeVisible()

    await page.getByRole('link', { name: "Let's go back home" }).click()
    await expect(page).toHaveURL('/')
  }
})

test('redirects a legacy post URL to its canonical URL', async ({
  request,
}) => {
  const response = await request.get('/building-blog', { maxRedirects: 0 })

  expect(response.status()).toBe(301)
  expect(response.headers().location).toBe('/posts/building-blog')
})
