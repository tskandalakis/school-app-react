import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

export default function StudentDashboard() {
  return (
  <Container>
  <Row>
    <Col>1 of 3</Col>
    <Col xs={6}>2 of 3 (wider)</Col>
    <Col>3 of 3</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col xs={5}>2 of 3 (wider)</Col>
    <Col>3 of 3</Col>
  </Row>
  <Row>
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to="/user/1">User 1</Link>
      </p>
    </div>
  </Row>
</Container>
  )
}