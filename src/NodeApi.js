import {withRouter} from 'react-router-dom';
import axios from 'axios';
import config from './config/config';

const instance = axios.create({
    baseURL: config.nodeApi
});

instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// Redirect user to login page on unauthorized response
axios.interceptors.response.use((response) => {

  if(response.status===401) {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  } else {
    return response;
  }

}, error => {
  // handle the response error
  return Promise.reject(error);
});

export default withRouter(instance);