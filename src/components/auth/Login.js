import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import nodeApi from '../../NodeApi';
import "./Login.css";

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  setEmail = (email) => {
    this.setState({ email: email })
  }

  setPassword = (password) => {
    this.setState({ password: password })
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await nodeApi.post(`/auth/login`, {
        email: this.state.email,
        password: this.state.password
      });

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      nodeApi.updateAuthHeader();

      const token = jwt_decode(data.access_token);
      const userData  = await nodeApi.get('/user/'+token._id);
      this.props.setActiveUser({ user: userData.data, loaded: true });

      return < Redirect to={{ pathname: "/" }} />
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    if(this.props.activeUser.loaded){
      return (< Redirect to={{ pathname: "/" }} />)
    } else {
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              <FormLabel >Email</FormLabel >
              <FormControl
                autoFocus
                type="email"
                name="email"
                onChange={e => this.setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel >Password</FormLabel >
              <FormControl
                type="password"
                name="password"
                onChange={e => this.setPassword(e.target.value)}
              />
            </FormGroup>
            <Button block disabled={!this.validateForm()} type="submit">
              Login
            </Button>
          </form>
        </div>
      );
    }
  };
}

export default withRouter(Login);