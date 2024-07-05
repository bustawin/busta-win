import { Figure } from 'react-bootstrap'
import image from './404.webp'

export default function NotFound() {
  const title = 'HTTP 404, page not found.'
  return (
    <Figure className="text-center d-block">
      <Figure.Image src={image} alt={title} title={title} />
      <Figure.Caption>{title}</Figure.Caption>
    </Figure>
  )
}
