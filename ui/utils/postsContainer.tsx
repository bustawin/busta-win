import { Link } from '@remix-run/react'
import * as layout from '@ui/components/layout/layout'
import card from '@jutils/ui/components/card/card'
import { Post } from '@src/domain/post'

export interface Props {
  posts: Post[]
  children: layout.MainContainerProps['children']
  top: layout.MainContainerProps['top']
}

export default function PostsContainer({ children, posts, top }: Props) {
  return (
    <layout.MainContainer top={top}>
      <layout.Main className="post">
        <layout.Row>
          <layout.Col>{children}</layout.Col>
        </layout.Row>

        {posts.map((post) => (
          <layout.Col key={post.id}>
            <card.Card className="post-preview">
              <Link to={`posts/${post.id}`} className="post-preview__link">
                <layout.Container>
                  <layout.Row>
                    <layout.Col xs="8">
                      <card.Body>
                        <card.Title>{post.title}</card.Title>
                        <card.Text>{post.summary}</card.Text>
                      </card.Body>
                    </layout.Col>
                    <layout.Col
                      className="post-preview__image"
                      style={{
                        backgroundImage: `url('${'https://www.bustawin.com/wp-content/uploads/2022/05/map-2019-1.svg'}')`,
                      }}
                    ></layout.Col>
                  </layout.Row>
                </layout.Container>
                <card.Footer>
                  {post.created.getFullYear()}-{post.created.getMonth()}-
                  {post.created.getDay()}
                </card.Footer>
              </Link>
            </card.Card>
          </layout.Col>
        ))}
      </layout.Main>
      <layout.Aside></layout.Aside>
    </layout.MainContainer>
  )
}
