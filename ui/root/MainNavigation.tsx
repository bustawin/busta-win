import './main-navigation.sass'
import timmy from './timmy.png'
import { Category } from '@src/domain/category'
import { Col, Container, Image, Nav, Row } from 'react-bootstrap'
import { NavLink } from '@remix-run/react'
import * as changeCase from 'change-case'

interface MainNavigationProps {
  categories: Category[]
}

export default function MainNavigation({ categories }: MainNavigationProps) {
  return (
    <Container className="main-navigation">
      <Row className="justify-content-md-center">
        <Col xs="auto" className="d-flex align-items-center">
          <Image src={timmy} id="timmy" />
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Row>
            <Col>
              <Row>
                <NavLink to="/" id="logo">
                  busta<span id="logo__period">.</span>win
                </NavLink>
              </Row>
              <Row>
                <Nav className="me-auto">
                  {categories.map((category) => (
                    <Nav.Link
                      key={category}
                      as={NavLink}
                      to={`/categories/${category}`}
                    >
                      {changeCase.capitalCase(category)}
                    </Nav.Link>
                  ))}
                  <Nav.Link as={NavLink} to="/about">
                    About
                  </Nav.Link>
                </Nav>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
