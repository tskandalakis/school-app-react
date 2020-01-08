import React from 'react';
import { Route, Switch } from 'react-router-dom'
import NavbarMenu from './components/navbar/NavbarMenu';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import StudentDashboard from './components/dashboards/StudentDashboard';
import UserDetailPage from './components/users/UserDetailPage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid="true">
      <NavbarMenu />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={StudentDashboard} />
        <PrivateRoute path="/user/:id" component={UserDetailPage} />
      </Switch>
    </Container>
  );
}

export default App;
