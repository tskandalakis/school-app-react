import React from 'react';
import { Route, Switch } from 'react-router-dom'
import StudentDashboard from './components/dashboards/StudentDashboard';
import UserDetailPage from './components/users/UserDetailPage';

function App() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={StudentDashboard} />
      <Route path="/user/:id" component={UserDetailPage} />
    </Switch>
  );
}

export default App;
