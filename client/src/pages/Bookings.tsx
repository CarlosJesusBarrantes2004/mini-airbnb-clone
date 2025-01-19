import { useEffect } from "react";
import useBooking from "../hooks/useBooking";
import { BookingCard } from "../components/booking/BookingCard";

export const Bookings = () => {
  const { fetchBookings, bookings } = useBooking();

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <section className="p-3 flex-1">
      <h1 className="mb-4 text-2xl text-[#ff07c1] font-semibold underline underline-offset-4">
        Mis Reservas
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p className="text-gray-600 text-center py-8 text-sm">
            No tienes ninguna reserva aún
          </p>
        )}
      </div>
    </section>
  );
};
