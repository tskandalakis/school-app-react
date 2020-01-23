import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import nodeApi from '../../NodeApi';

export default function UserDetailPage(props) {
  const initialUserState = {
    user: {},
    loading: true,
  }

  const [user, setUser] = useState(initialUserState)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await nodeApi.get(`/user/${props.match.params.id}`);

      setUser(data)
    }

    getUser()
  }, [props.match.params.id])

  return user.loading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody> 
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.admin}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col></Col>
      </Row>
  </Container>
  )
}