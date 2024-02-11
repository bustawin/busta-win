import { Link, useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import * as postSer from '@src/adapters/serializers/post'
import * as layout from '@ui/utils/layout'
import * as card from '@ui/utils/card'

export const loader = async () => {
  const posts = await commands.posts()
  const rawPosts = postSer.dump(...posts)
  return {
    rawPosts,
  }
}

export default function Index() {
  const { rawPosts } = useLoaderData<typeof loader>()
  const posts = postSer.load(...(rawPosts as postSer.RawPost[]))
  const lead = (
    <div>
      <div className="lead">Hello, I'm bustawin.</div>
      <p>—aka Xavier Bustamante.</p>
    </div>
  )
  return (
    <layout.MainContainer>
      <layout.Main className="post">
        <layout.Row>
          <layout.Col>
            {lead}
            <p>
              I'm a geeky software engineer focused on product development, with
              a spice of academic research and python.
            </p>
            <p>
              In here, I talk about things I do—publications, notes, and tricks.
            </p>
          </layout.Col>
        </layout.Row>

        {posts.map((post) => (
          <layout.Col key={post.id}>
            <card.Card className="post-preview">
              <Link to={`posts/${post.id}`} className="post-preview__link">
                <layout.Container>
                  <layout.Row>
                    <layout.Col xs="8">
                      <card.Card.Body>
                        <card.Card.Title>{post.title}</card.Card.Title>
                        <card.Card.Text>{post.summary}</card.Card.Text>
                      </card.Card.Body>
                    </layout.Col>
                    <layout.Col
                      className="post-preview__image"
                      style={{
                        backgroundImage: `url('${'https://www.bustawin.com/wp-content/uploads/2022/05/map-2019-1.svg'}')`,
                      }}
                    ></layout.Col>
                  </layout.Row>
                </layout.Container>
                <card.Card.Footer>
                  {post.created.getFullYear()}-{post.created.getMonth()}-
                  {post.created.getDay()}
                </card.Card.Footer>
              </Link>
            </card.Card>
          </layout.Col>
        ))}
      </layout.Main>
      <layout.Aside></layout.Aside>
    </layout.MainContainer>
  )
}
