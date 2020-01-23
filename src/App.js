import React, { useState, useEffect } from 'react';
import NavbarMenu from './components/navbar/NavbarMenu';
import { Container } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import Routes from './Routes';
import NodeApi from './NodeApi';

function App() {
  const initialUserState = {
    user: null,
    loaded: false,
  }

  const [activeUser, setActiveUser] = useState(initialUserState)

  useEffect(() => {
    async function onLoad() {
      if(activeUser.user===null && localStorage.getItem('access_token')) {
          const token = jwt_decode(localStorage.getItem('access_token'));
          const { data } = await NodeApi.get('/user/'+token._id);
          setActiveUser({ user: data, loaded: true });
      }
    };

    onLoad();
  }, [activeUser, setActiveUser]);

  return (
    <Container fluid="true">
      <NavbarMenu appProps={{ activeUser, setActiveUser }} />
      <Routes appProps={{ activeUser, setActiveUser }} />
    </Container>
  );
}

export default App;
