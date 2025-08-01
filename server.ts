import { serve, server } from '@jutils/src.server/service/serve'
import { RequestHandler } from 'express'
import { readdir } from 'fs/promises'
import it from 'iterated'

const oldPosts = it.pipe(
  await readdir('posts'),
  it.map((post) => `/${post}`),
  it.set
)

const redirect: RequestHandler = (req, res, next) => {
  const normalizedPath =
    req.path[req.path.length - 1] == '/' ? req.path.slice(0, -1) : req.path

  const shouldRedirect = oldPosts.has(normalizedPath)
  if (shouldRedirect) {
    const path = `/posts${normalizedPath}`
    res.redirect(301, path)
  } else if (normalizedPath.includes('/posts/interorg-network-dataset')) {
    res.redirect(301, '/interorg-network#the-dataset')
  } else {
    next()
  }
}

const app = await server({ requestHandlers: [redirect] })

serve(app)
