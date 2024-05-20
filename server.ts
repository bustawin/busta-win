import { serve, server } from '@jutils/src.server/service/serve'
import { postIds } from '@src/adapters/posts/postsDir'
import it from 'iterated'

const _posts = await postIds()
const oldPosts = it.set(_posts.map((post) => `/${post}`))

function redirect(req, res, next) {
  const normalizedPath =
    req.path[req.path.length - 1] == '/' ? req.path.slice(0, -1) : req.path

  const shouldRedirect = oldPosts.has(normalizedPath)
  if (shouldRedirect) {
    const path = `/posts${normalizedPath}`
    res.redirect(301, path)
  } else {
    next()
  }
}

const app = await server({ requestHandlers: [redirect] })

serve(app)
