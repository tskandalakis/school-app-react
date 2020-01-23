import React from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class NavbarMenu extends React.Component {
  render() {
    if(this.props.appProps.activeUser.loaded) {
      if(this.props.appProps.activeUser.user.role === "super") {
        return (
          <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to='/classes'>Classes</Nav.Link>
              <Nav.Link as={NavLink} to='/directory'>Directory</Nav.Link>
              <Nav.Link as={NavLink} to='/school'>Schools</Nav.Link>
            </Nav>
            <Nav>
            <NavDropdown title={ this.props.appProps.activeUser.user.name } id="ncollasible-nav-dropdow">
                <NavDropdown.Item as={NavLink} to='/account'>Account</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/logout'>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
      } else if(this.props.appProps.activeUser.user.role === "admin") {
        return (
          <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to='/classes'>Classes</Nav.Link>
              <Nav.Link as={NavLink} to='/directory'>Directory</Nav.Link>
            </Nav>
            <Nav>
            <NavDropdown title={this.props.appProps.activeUser.user.name} id="ncollasible-nav-dropdow">
                <NavDropdown.Item as={NavLink} to='/account'>Account</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/logout'>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
      } else {
        return (
          <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to='/classes'>Classes</Nav.Link>
              <Nav.Link as={NavLink} to='/directory'>Directory</Nav.Link>
            </Nav>
            <Nav>
            <NavDropdown title={this.props.appProps.activeUser.user.name} id="ncollasible-nav-dropdow">
                <NavDropdown.Item as={NavLink} to='/account'>Account</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/logout'>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
      }
    } else {
      return null;
    }
  }
}

export default withRouter(NavbarMenu);