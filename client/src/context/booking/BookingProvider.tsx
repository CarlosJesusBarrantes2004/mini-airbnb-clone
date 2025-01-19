import { useState } from "react";
import BookingContext from "./BookingContext";
import { BACKEND_URL } from "../../config";

interface BookingProviderProps {
  children: React.ReactNode;
}

const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) setBookings(json.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooking = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/bookings/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const createBooking = async (booking: any) => {
    try {
      const response = await fetch(`${BACKEND_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const json = await response.json();

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    bookings,
    fetchBookings,
    fetchBooking,
    createBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingProvider;
