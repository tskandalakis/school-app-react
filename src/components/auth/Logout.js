import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import "./Login.css";

class Logout extends React.Component {
  render() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    this.props.setActiveUser({
      user: {},
      loaded: false
    });
    return <Redirect to={{ pathname: "/login" }} />
  }
}

export default withRouter(Logout);