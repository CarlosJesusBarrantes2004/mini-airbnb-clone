import { Booking } from "../../types/booking.types";
import { Calendar } from "lucide-react";
import { Users } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const formatDate = (date: string | Date) => {
    const dateObject = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(dateObject);
  };

  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <header className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {booking.property.title}
        </h2>
      </header>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <p className="flex items-center gap-2">
            Huéspedes
            <span className="px-2 py-1 rounded-full bg-pink-100 text-[#ff07c1] text-xs font-medium">
              {booking.guests}
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Fechas</span>
          </h3>
          <div className="flex flex-col gap-1 text-sm pl-7">
            <time dateTime={booking.startDate} className="text-gray-600">
              Entrada: {formatDate(booking.startDate)}
            </time>
            <time dateTime={booking.endDate} className="text-gray-600">
              Salida: {formatDate(booking.endDate)}
            </time>
          </div>
        </div>
      </div>
      <footer className="p-4 border-t border-gray-100">
        <button className="w-full text-sm text-[#ff07c1] hover:text-[#f546c9] transition-colors font-medium">
          Ver detalles
        </button>
      </footer>
    </article>
  );
};
