import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return (
      status === 200 ||
      status === 201 ||
      status === 204 ||
      status === 400 ||
      status === 401 ||
      status === 403 ||
      status === 404
    );
  },
});

export default api;
