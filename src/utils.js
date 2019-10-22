import axios from 'axios';

export const isAuthenticated = () => {
  try {
    const token = window.localStorage.getItem('Authorization');
    let payload = JSON.parse(atob(token.split(' ')[1].split('.')[1]));
    return payload.exp > Date.now() / 1000
  } catch(e) {
    return false;
  }
}

export const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || 'http://localhost:4000',
});

apiService.defaults.headers.common['Authorization'] = localStorage.
  getItem('Authorization');

export const removeCred = () => {
  localStorage.removeItem('Authorization');
  delete apiService.defaults.headers.common["Authorization"];
}

export const storeCred = (token) => {
  apiService.defaults.headers.common['Authorization'] = token
  localStorage.setItem('Authorization', token);
}
