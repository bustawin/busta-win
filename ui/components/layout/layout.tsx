import * as rb from 'react-bootstrap'
import * as ut from '@jutils/ui/reactUtils'

export { Col, Row, Container } from 'react-bootstrap'

export interface MainContainerProps {
  children?: ut.Children
  top?: ut.ReactNode
}

export function MainContainer({ children, top }: MainContainerProps) {
  return (
    <main>
      {top && (
        <rb.Container fluid className="layout__top">
          <rb.Row>
            <rb.Col>{<h1>{top}</h1>}</rb.Col>
          </rb.Row>
        </rb.Container>
      )}
      <rb.Container className="layout__main-container">
        <rb.Row>{children}</rb.Row>
      </rb.Container>
    </main>
  )
}

interface MainProps {
  className?: ut.ClassName
  children?: ut.Children
}

export function Main({ children, className }: MainProps) {
  return (
    <rb.Col
      xs="12"
      md={{ span: 10, offset: 1 }}
      lg={{ span: 8, offset: 2 }}
      xxl={{ span: 6, offset: 3 }}
    >
      <div className={ut.cls(className)}>{children}</div>
    </rb.Col>
  )
}

interface AsideProps {
  children?: ut.Children
}

export function Aside({ children }: AsideProps) {
  return (
    <rb.Col className="layout__aside" xl="2" xxl="3" as="aside">
      {children}
    </rb.Col>
  )
}
