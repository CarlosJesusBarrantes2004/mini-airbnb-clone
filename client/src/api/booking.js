import axios from './axios';

export const getBookingsRequest = () => axios.get('/bookings');

export const getBookingRequest = (id) => axios.get(`/bookings/${id}`);

export const createBookingRequest = (booking) =>
  axios.post('/bookings', booking);
