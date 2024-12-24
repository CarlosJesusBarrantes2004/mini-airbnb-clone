import { Router } from 'express';
import validateToken from '../middlewares/validateToken.js';
import {
  getBookings,
  getBooking,
  createBooking,
} from '../controllers/booking.controller.js';

const router = Router();

router.get('/bookings', validateToken, getBookings);

router.get('/bookings/:id', validateToken, getBooking);

router.post('/bookings', validateToken, createBooking);

export default router;
