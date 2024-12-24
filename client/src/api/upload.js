import axios from './axios';

export const uploadByLinkRequest = (link) =>
  axios.post('/upload-by-link', link);

export const uploadFromDeviceRequest = (file) =>
  axios.post('/upload-from-device', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
