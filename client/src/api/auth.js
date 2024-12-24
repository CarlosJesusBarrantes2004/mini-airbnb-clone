import axios from './axios';

export const signupRequest = (user) => axios.post('/signup', user);

export const signinRequest = (user) => axios.post('/signin', user);

export const signoutRequest = () => axios.post('/signout');

export const verifyTokenRequest = () => axios.get('/profile');