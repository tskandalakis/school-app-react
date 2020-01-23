import React from 'react'
import AppliedRoute from "./components/auth/AppliedRoute";
import { Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import UserAccountPage from './components/users/UserAccountPage';
import Dashboard from './components/dashboards/Dashboard';
import Directory from './components/directory/Directory';
import School from './components/schools/Schools';
import Classes from './components/classes/Classes';
import NotFound from './components/NotFound';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Dashboard} appProps={appProps} auth="true" />
      <AppliedRoute path="/classes" exact component={Classes} appProps={appProps} auth="true" />
      <AppliedRoute path="/directory" exact component={Directory} appProps={appProps} auth="true" />
      <AppliedRoute path="/school" exact component={School} appProps={appProps} auth="true" />
      <AppliedRoute path="/account" exact component={UserAccountPage} appProps={appProps} auth="true" />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/logout" exact component={Logout} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
