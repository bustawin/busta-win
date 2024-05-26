import timmy from './timmy.png'

import { Category } from '@src/domain/category'
import { Col, Container, Image, Nav, Row } from 'react-bootstrap'
import { NavLink } from '@remix-run/react'
import MainNavigationBg from './mainNavigationBg'
import { humanize } from '@ui/utils/categories'

interface MainNavigationProps {
  categories: Category[]
}

export default function MainNavigation({ categories }: MainNavigationProps) {
  return (
    <Container className="main-navigation" fluid>
      <MainNavigationBg />
      <Row className="d-flex justify-content-center">
        <Col xs="auto" className="d-flex align-items-center p-0">
          <NavLink to="/" id="logo">
            <Image src={timmy} id="timmy" />
          </NavLink>
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
                        prefetch="intent"
                      >
                        {humanize(category)}
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
