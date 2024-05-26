import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import * as commands from '@src/service/commands'
import * as postSer from '@src/adapters/serializers/post'
import PostsContainer from '@ui/utils/postsContainer'
import { loaderCache } from '@ui/utils/cache'

export const loader = async () => {
  const posts = await commands.posts()
  const rawPosts = postSer.dump(...posts)
  return json(
    {
      rawPosts,
    },
    { headers: { ...loaderCache } }
  )
}

export default function Index() {
  const { rawPosts } = useLoaderData<typeof loader>()
  const posts = postSer.load(...(rawPosts as postSer.RawPost[]))
  return (
    <PostsContainer posts={posts}>
      <article>
        <div>
          <div className="lead">Hello, I'm bustawin.</div>
        </div>
        <p>
          In this website I talk about things I do—publications, notes, and
          tricks.
        </p>
      </article>
    </PostsContainer>
  )
}
