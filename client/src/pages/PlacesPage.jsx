import { Link } from 'react-router-dom';
import useMessage from '../hooks/useMessage';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import usePlace from '../hooks/usePlace';
import { useEffect } from 'react';
import PlaceImg from '../components/PlaceImg';

const PlacesPage = () => {
  const { userPlaces, fetchPlacesByUser } = usePlace();
  const { successes } = useMessage();

  useEffect(() => {
    (async () => await fetchPlacesByUser())();
  }, []);

  return (
    <div>
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white rounded-full px-6 py-2"
          to={'/account/places/new'}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      {successes && <Alert type={'success'} message={successes}></Alert>}

      <div className="mt-4">
        {userPlaces.length > 0 ? (
          userPlaces.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={`user-${place._id}`}
              className="my-6 flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex h-32 w-32 bg-gray-300">
                <PlaceImg place={place}></PlaceImg>
              </div>
              <div className="grow">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex mt-20 items-center justify-center">
            <Loading message={'No Places!'}></Loading>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
