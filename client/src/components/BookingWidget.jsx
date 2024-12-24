import { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import useBooking from '../hooks/useBooking';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  let numberOgNights = 0;
  const { createBooking } = useBooking();

  if (checkIn && checkOut) {
    numberOgNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookPlace = async () => {
    const booking = {
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      price: place.price * numberOgNights,
      place: place._id,
    };
    await createBooking(booking);
  };

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center mb-4">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl">
        <div className="flex">
          <div className="py-3 px-4 w-1/2">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        {numberOgNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number: </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookPlace} className="primary mt-4">
        Book this place
        {numberOgNights > 0 && <span> ${numberOgNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
