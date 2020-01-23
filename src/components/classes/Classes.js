import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

class Classes extends React.Component {
  render() {
    return (
      <Container>
      <Row>
        <div className="container">
          <h1>Classes</h1>
        </div>
      </Row>
    </Container>
    )
  }
}

export default withRouter(Classes);