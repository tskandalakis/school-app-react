import {withRouter} from 'react-router-dom';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import config from './config/config';

const instance = axios.create({
    baseURL: config.nodeApi
});

const updateAuthHeader = () => {
  instance.defaults.headers.common['Authorization'] = localStorage.getItem('access_token') || "";
}

const refreshAuthLogic = async failedRequest => {
  const tokenRefreshCall = await axios.post(config.nodeApi+'/auth/refresh', { refresh_token: localStorage.getItem('refresh_token')});
  if(tokenRefreshCall.status===201) {
    localStorage.setItem('access_token', tokenRefreshCall.data.access_token);
    this.updateAuthHeader();
    return Promise.resolve();
  } else {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.updateAuthHeader();
    return this.props.history.push('/login');
  }
};

updateAuthHeader();
createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default withRouter(instance);