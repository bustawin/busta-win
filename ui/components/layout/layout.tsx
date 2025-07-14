import * as ut from '@jutils/ui/reactUtils'
import './layout.css'

export interface MainContainerProps {
  children?: ut.Children
  top?: ut.ReactNode
  itemScope?: boolean
  itemType?: string
}

export function MainContainer({
  children,
  top,
  itemScope,
  itemType,
}: MainContainerProps) {
  return (
    <main itemScope={itemScope} itemType={itemType} className="layout">
      {top && <header itemProp="headline">{<h1>{top}</h1>}</header>}
      <div className="layout__main-container">{children}</div>
    </main>
  )
}

interface MainProps {
  className?: ut.ClassName
  children?: ut.Children
  props?: ut.Props
  itemProp?: string
}

export function Main({ children, className }: MainProps) {
  return <div className={ut.cls(className, 'layout__main')}>{children}</div>
}

interface AsideProps {
  className?: ut.ClassName
  children?: ut.Children
}

export function Aside({ children, className }: AsideProps) {
  return (
    <aside className={ut.cls(className, 'layout__aside')}>{children}</aside>
  )
}
