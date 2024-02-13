import * as rb from 'react-bootstrap'
import * as ut from '@jutils/ui/reactUtils'

export { Col, Row, Container } from 'react-bootstrap'

export interface MainContainerProps {
  children?: ut.Children
  top?: ut.ReactNode
}

export function MainContainer({ children, top }: MainContainerProps) {
  return (
    <>
      {top && (
        <rb.Container fluid className="layout__top">
          <rb.Row>
            <rb.Col>{<h1>{top}</h1>}</rb.Col>
          </rb.Row>
        </rb.Container>
      )}
      <rb.Container fluid="xl" className="layout__main-container">
        <rb.Row>{children}</rb.Row>
      </rb.Container>
    </>
  )
}

interface MainProps {
  className?: ut.ClassName
  children?: ut.Children
}

export function Main({ children, className }: MainProps) {
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

interface AsideProps {
  children?: ut.Children
}

export function Aside({ children }: AsideProps) {
  return (
    <rb.Col className="layout__aside" lg="3">
      <aside>{children}</aside>
    </rb.Col>
  )
}
