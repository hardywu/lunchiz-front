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

export const recordId = record => {
  if (Array.isArray(record)) {
    return record.map(rec => recordId(rec))
  } else {
    return `${record.type}_${record.id}`
  }
}

export const idToRecordId = (id, type) => `${type.toLowerCase()}_${id}`;

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
  globalRecords[recordId(data)] = parseDataObject(data);
  return recordId(data);
}

export const parseJsonError = ({ errors = [] }) =>  errors.map(e => e.detail)
export const delRecord = recId => { delete globalRecords[recId] }

export const toJsonApi = (resource = {}) => {
  let obj = {
    id: resource.id, type: resource.type,
    attributes: {}, relationships: {}
  };
  Object.keys(resource).forEach(key => {
    if (key.slice(-2) === 'Id') {
      obj.relationships[key.slice(0, -2)] = { data: { id: resource[key] } };
    } else if (!(['id', 'type'].includes(key) )) {
      obj.attributes[key] = resource[key]
    }
  })
  return { data: obj };
}

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const getErrorData = ({ response: { data = {} } = {} }) =>
  parseJsonError(data)
