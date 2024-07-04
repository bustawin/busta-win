import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import * as commands from '@src/service/commands'
import * as layout from '@ui/components/layout/layout'
import { loaderCache } from '@ui/utils/cache'
import PostComponent from '@ui/components/post/post'
import * as postSer from '@src/adapters/serializers/post'

export const loader = async () => {
  const post = await commands.post('_about')
  return json(
    {
      post: postSer.dump(post)[0],
    },
    { headers: { ...loaderCache } }
  )
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  const [Post] = PostComponent({ content: post.content })
  return (
    <layout.MainContainer top="About me and this place">
      <layout.Main>{Post}</layout.Main>
    </layout.MainContainer>
  )
}
