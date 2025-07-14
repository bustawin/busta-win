import { Link } from '@remix-run/react'
import * as layout from '@ui/components/layout/layout'
import { Post } from '@src/domain/post'
import './postsContainer.css'
import { postInfo } from '@ui/components/post/post'

export interface Props {
  posts: Post[]
  children: layout.MainContainerProps['children']
  top?: layout.MainContainerProps['top']
}

export default function PostsContainer({ children, posts, top }: Props) {
  return (
    <layout.MainContainer top={top}>
      <layout.Main>
        <header>{children}</header>
      </layout.Main>
      <layout.Aside />

      {posts.map((post) => (
        <>
          <layout.Main>
            <article
              key={post.id}
              id={post.id}
              className="post-preview"
              itemScope
              itemType="https://schema.org/BlogPosting"
              itemRef={`${post.id}-created`}
            >
              <Link
                to={`/posts/${post.id}`}
                className="post-preview__link"
                prefetch="intent"
                itemProp="url"
              >
                <header>
                  <h2 className="post-preview__title" itemProp="headline">
                    {post.title}
                  </h2>
                </header>
                <div className="post-preview__body" itemProp="abstract">
                  {post.summary}
                </div>
              </Link>
            </article>
          </layout.Main>
          <layout.Aside>
            <div className="post-preview__aside">
              {postInfo({ short: true, ...post })}
            </div>
          </layout.Aside>
        </>
      ))}
    </layout.MainContainer>
  )
}
