import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePlace from '../hooks/usePlace';
import Loading from '../components/Loading';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const { fetchPlace } = usePlace();

  useEffect(() => {
    if (!id) return;
    const getPlace = async () => {
      const place = await fetchPlace(id);
      setPlace(place);
    };
    getPlace();
  }, [id]);

  if (!place) return <Loading></Loading>;

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl ">{place.title}</h1>
      <AddressLink className={'flex my-4 '}>{place.address}</AddressLink>
      <PlaceGallery place={place}></PlaceGallery>
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mb-4">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place}></BookingWidget>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="text-sm text-gray-700 mt-2 mb-4 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
