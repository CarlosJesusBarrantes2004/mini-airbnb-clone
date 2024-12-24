import axios from './axios';

export const getPlacesRequest = () => axios.get('/places');

export const getPlacesByUserRequest = () => axios.get('/user-places');

export const getPlaceByIdRequest = (id) => axios.get(`/places/${id}`);

export const createPlaceRequest = (place) => axios.post('/places', place);

export const updatePlaceRequest = (id, place) =>
  axios.put(`/places/${id}`, place);
