export interface Booking {
  _id: string;
  property: string;
  guests: number;
  startDate: string;
  endDate: string;
}

export interface BookingContextType {
  bookings: Booking[];
  fetchBookings: () => Promise<void>;
  fetchBooking: (id: string) => Promise<void>;
  createBooking: (booking: any) => Promise<void>;
}
