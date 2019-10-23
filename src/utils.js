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

export const globalRecords = {};

export const recordId = record => {
  if (Array.isArray(record)) {
    return record.map(rec => recordId(rec))
  } else {
    return `${record.type}_${record.id}`
  }
}

export const parseDataObject = (data) => {
  let resource = {};
  resource.id = data.id;
  resource.type = data.type;
  data && Object.assign(resource, data.attributes);
  if (data && data.relationships) {
    Object.keys(data.relationships).forEach(name => {
      resource[name] = recordId(data.relationships[name].data)
    });
  }
  return resource;
}

export const parseJsonApi = ({ included, data }) => {
  if (included) {
    parseJsonApi({ data: included });
  }
  if (Array.isArray(data)) {
    return data.map(record => parseJsonApi({ data: record }));
  }
  const resource = parseDataObject(data);
  globalRecords[recordId(data)] = resource;
  return resource;
}
