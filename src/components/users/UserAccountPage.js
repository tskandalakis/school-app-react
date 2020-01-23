import React from 'react'
import { withRouter } from 'react-router-dom';
import { Container, Row, Table } from 'react-bootstrap';

class UserAccountPage extends React.Component {

  render() {
    return (
      <Container>
        <Row>
          <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ this.props.activeUser.user._id }</td>
              <td>{ this.props.activeUser.user.name }</td>
              <td>{ this.props.activeUser.user.email }</td>
              <td>{ this.props.activeUser.user.role }</td>
            </tr>
          </tbody>
        </Table>
        </Row>
      </Container>
    )
  }
}

export default withRouter(UserAccountPage);