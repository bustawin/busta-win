import { Link } from '@remix-run/react'
import * as layout from '@ui/components/layout/layout'
import card from '@jutils/ui/components/card/card'
import { Post } from '@src/domain/post'

export interface Props {
  posts: Post[]
  children: layout.MainContainerProps['children']
  top?: layout.MainContainerProps['top']
}

export default function PostsContainer({ children, posts, top }: Props) {
  return (
    <layout.MainContainer top={top}>
      <layout.Main>
        <layout.Row>
          <layout.Col>{children}</layout.Col>
        </layout.Row>

        {posts.map((post) => (
          <layout.Col key={post.id} as="article">
            <card.Card className="post-preview">
              <Link
                to={`/posts/${post.id}`}
                className="post-preview__link"
                prefetch="intent"
              >
                <layout.Row>
                  <layout.Col xs={post.image ? '8' : '12'}>
                    <card.Body>
                      <card.Title as="h5">{post.title}</card.Title>
                      <card.Text>{post.summary}</card.Text>
                    </card.Body>
                  </layout.Col>
                  {post.image && (
                    <layout.Col
                      className="post-preview__image"
                      style={{
                        backgroundImage: `url('${post.image}')`
                      }}
                    ></layout.Col>
                  )}
                </layout.Row>
                <div className="post-preview__aside">
                  <time dateTime={post.created.toISOString()}>
                    {post.created.toLocaleString('en-US', { month: 'short' })}<br/>
                    {post.created.toISOString().slice(0, 4)}
                  </time>
                </div>
              </Link>
            </card.Card>
          </layout.Col>
        ))}
      </layout.Main>
      <layout.Aside></layout.Aside>
    </layout.MainContainer>
  )
}
