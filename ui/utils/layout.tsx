import * as rb from 'react-bootstrap'
import * as ut from '@jutils/ui/reactUtils'

export { Col, Row, Container } from 'react-bootstrap'

export function MainContainer({ children, top }) {
  return (
    <>
      {top && (
        <rb.Container fluid className="layout__top">
          <rb.Row>
            <rb.Col>{top}</rb.Col>
          </rb.Row>
        </rb.Container>
      )}
      <rb.Container fluid="xl" className="layout__main-container">
        <rb.Row>{children}</rb.Row>
      </rb.Container>
    </>
  )
}

export function Main({ children, className }) {
  return (
    <>
      <rb.Col
        xs="12"
        md={{ span: 10, offset: 1 }}
        lg={{ span: 7, offset: 2 }}
        xxl={{ span: 6, offset: 3 }}
      >
        <main className={ut.cls(className)}>{children}</main>
      </rb.Col>
    </>
  )
}

export function Aside({ children }) {
  return (
    <rb.Col className="layout__aside" lg="3">
      <aside>{children}</aside>
    </rb.Col>
  )
}
