import { title, url } from '@ui/routes/posts.feed/feed'

export const feedLink = {
  rel: 'alternate',
  type: 'application/atom+xml',
  href: url,
  title,
}
