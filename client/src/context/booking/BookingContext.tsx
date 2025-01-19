import { createContext } from "react";
import { BookingContextType } from "../../types/booking.types";

const BookingContext = createContext<BookingContextType | null>(null);

export default BookingContext;
