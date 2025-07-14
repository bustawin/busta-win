import image from './404.webp'

export default function NotFound() {
  const title = 'HTTP 404, page not found.'
  return (
    <figure className="figure--image">
      <img src={image} alt={title} title={title} />
      <figcaption>{title}</figcaption>
    </figure>
  )
}
