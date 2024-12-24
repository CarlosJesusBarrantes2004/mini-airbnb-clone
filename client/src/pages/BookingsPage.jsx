import { useEffect } from 'react';
import useBooking from '../hooks/useBooking';
import useMessage from '../hooks/useMessage';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import PlaceImg from '../components/PlaceImg';
import BookingDate from '../components/BookingDate';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
  const { bookings, fetchBookings } = useBooking();
  const { successes } = useMessage();

  useEffect(() => {
    (async () => await fetchBookings())();
  }, []);

  return (
    <div>
      {successes && <Alert type={'success'} message={successes}></Alert>}

      <div className="mt-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={`booking-${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-4"
            >
              <div className="w-48">
                <PlaceImg place={booking.place}></PlaceImg>
              </div>
              <div className="py-3 grow pr-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-lg font-semibold">
                  <BookingDate
                    className="mb-2 mt-4 text-gray-500"
                    booking={booking}
                  ></BookingDate>
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>{' '}
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex mt-20 items-center justify-center">
            <Loading message={'No bookings!'}></Loading>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
