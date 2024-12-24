import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBooking from '../hooks/useBooking';
import Loading from '../components/Loading';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDate from '../components/BookingDate';

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { fetchBooking } = useBooking();

  useEffect(() => {
    if (!id) return;
    const getBooking = async () => {
      const booking = await fetchBooking(id);
      setBooking(booking);
    };
    getBooking();
  }, [id]);

  if (!booking) return <Loading></Loading>;

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className={'my-4 '}>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4 font-semibold">
            Your booking information
          </h2>
          <BookingDate
            booking={booking}
            className="mb-2 mt-4 items-center"
          ></BookingDate>
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}></PlaceGallery>
    </div>
  );
};

export default BookingPage;
