import axios from 'axios';
import { JSONAPINormalizer, cachedRecords } from 'restbee/dist/lib/restbee'

export const isAuthenticated = () => {
  try {
    const token = window.localStorage.getItem('Authorization');
    let payload = JSON.parse(atob(token.split(' ')[1].split('.')[1]));
    return payload.exp > Date.now() / 1000
  } catch(e) {
    removeCred();
    return false;
  }
}

export const normalizer = new JSONAPINormalizer(cachedRecords)
export const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || 'http://localhost:4000',
});

apiService.interceptors.response.use(
  (resp) => {
    try {
      return Object.assign(
        {}, 
        resp, 
        { data: { data: normalizer.parse(resp), meta: resp.data.meta } },
      )
    } catch(e) {
      return resp
    }    
  }, 
  (err) => Promise.reject(normalizer.parseErrors(err)),
)

apiService.defaults.headers.common['Authorization'] = localStorage
  .getItem('Authorization');

export const removeCred = () => {
  localStorage.removeItem('Authorization');
  delete apiService.defaults.headers.common["Authorization"];
}

export const storeCred = (token) => {
  apiService.defaults.headers.common['Authorization'] = token
  localStorage.setItem('Authorization', token);
}

export const globalRecords = cachedRecords

export const delRecord = recId => { delete globalRecords[recId] }
export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

 