export type Post = {
  title: string
  slug: string
}

export async function getPosts(): Promise<Array<Post>> {
  return [
    {
      slug: 'my-first-post',
      title: 'My First Post',
    },
    {
      slug: '90s-mixtape',
      title: 'A Mixtape I Made Just For You',
    },
  ]
}
