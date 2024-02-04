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
      <Row className="d-flex justify-content-center">
        <Col xs="auto" className="d-flex align-items-center">
          <Image src={timmy} id="timmy" />
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Row>
            <Col>
              <Row>
                <Col>
                  <NavLink to="/" id="logo">
                    busta<span id="logo__period">.</span>win
                  </NavLink>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Nav className="me-auto main-navigation__nav-row__nav">
                    {categories.map((category) => (
                      <Nav.Link
                        key={category}
                        as={NavLink}
                        to={`/categories/${category}`}
                        className={`main-navigation__nav-link main-navigation__nav-link--${category}`}
                      >
                        {changeCase.capitalCase(category)}
                      </Nav.Link>
                    ))}
                    <Nav.Link
                      as={NavLink}
                      to="/about"
                      className="main-navigation__nav-link"
                    >
                      About
                    </Nav.Link>
                  </Nav>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
