import { useState } from 'react';
import BookingContext from './BookingContext';
import {
  getBookingsRequest,
  getBookingRequest,
  createBookingRequest,
} from '../../api/booking';
import useMessage from '../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';

const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const { setSuccesses } = useMessage();
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const { data } = await getBookingsRequest();
      if (data.success) setBookings(data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooking = async (id) => {
    try {
      const { data } = await getBookingRequest(id);
      if (data.success) return data.booking;
    } catch (error) {
      console.log(error);
    }
  };

  const createBooking = async (booking) => {
    try {
      const { data } = await createBookingRequest(booking);
      if (data.success) {
        setSuccesses(data.message);
        navigate(`/account/bookings/${data.booking._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookingContext.Provider
      value={{ bookings, fetchBookings, fetchBooking, createBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
