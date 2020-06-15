import axios from 'axios';

const request = axios.create({
  baseURL: '/api/',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default request;
