import { Link, useLoaderData } from '@remix-run/react'
import * as commands from '@src/service/commands'
import { Card, Col, Container, Row } from 'react-bootstrap'
import * as postConverter from '@ui/domain/post'
import { RawPost } from '@ui/domain/post'

export const loader = async () => {
  const posts = await commands.posts()
  const rawPosts = postConverter.toJson(...posts)
  return {
    rawPosts,
  }
}

export default function Index() {
  const { rawPosts } = useLoaderData<typeof loader>()
  const posts = postConverter.fromJson(...(rawPosts as RawPost[]))
  return (
    <main>
      <div className="my-4">
        <div className="lead">Hello, I'm bustawin (aka Xavier Bustamante).</div>
        <p>
          I'm a geeky software engineer focused on product development, with a
          spice of academic research and python.
        </p>
        <p>
          In here, I talk about things I do—publications, notes, and tricks.
        </p>
      </div>
      <Container>
        <Row xs={1}>
          {posts.map((post) => (
            <Col key={post.id} className="g-4">
              <Card className="post-preview">
                <Link to={`posts/${post.id}`} className="post-preview__link">
                  <Container>
                    <Row>
                      <Col xs="8">
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>{post.summary}</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col
                        className="post-preview__image"
                        style={{
                          backgroundImage: `url('${'https://www.bustawin.com/wp-content/uploads/2022/05/map-2019-1.svg'}')`,
                        }}
                      ></Col>
                    </Row>
                  </Container>
                  <Card.Footer>
                    {post.created.getFullYear()}-{post.created.getMonth()}-
                    {post.created.getDay()}
                  </Card.Footer>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  )
}
