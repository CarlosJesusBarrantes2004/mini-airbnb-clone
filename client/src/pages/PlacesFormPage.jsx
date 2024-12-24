import { useEffect, useState } from 'react';
import usePlace from '../hooks/usePlace';
import useMessage from '../hooks/useMessage';
import Perks from '../components/Perks';
import Alert from '../components/Alert';
import PhotosUploader from '../components/PhotosUploader';
import { useParams } from 'react-router-dom';

const PlacesFormPage = () => {
  const { id } = useParams();
  const { createPlace, fetchPlace, updatePlace } = usePlace();
  const { errors } = useMessage();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const inputHeader = (text) => <h2 className="text-xl mt-4">{text}</h2>;

  const inputDescription = (text) => (
    <p className="text-gray-500 text-sm">{text}</p>
  );

  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );

  const savePlace = async (e) => {
    e.preventDefault();
    const place = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    id ? await updatePlace(id, place) : await createPlace(place);
  };

  useEffect(() => {
    if (!id) return;
    const getPlace = async () => {
      const place = await fetchPlace(id);
      setTitle(place.title);
      setAddress(place.address);
      setAddedPhotos(place.photos);
      setDescription(place.description);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setPrice(place.price);
    };
    getPlace();
  }, [id]);

  return (
    <>
      {errors &&
        errors.map((error, i) => (
          <Alert key={i} message={error} type={'error'}></Alert>
        ))}
      <div>
        <form onSubmit={savePlace}>
          {preInput(
            'Title',
            'Title for your place. Should be short and catchy as in advertisement'
          )}
          <input
            type="text"
            placeholder="title, for example: My lovely apt"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {preInput('Address', 'Address to this place')}
          <input
            type="text"
            placeholder="address, for example: 123 Main St"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {preInput('Photos', 'more = better')}
          <PhotosUploader
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
          ></PhotosUploader>
          {preInput('Description', 'Description of the place')}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {preInput('Perks', 'Select all the perks of your place')}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks perks={perks} setPerks={setPerks}></Perks>
          </div>
          {preInput('Extra info', 'house roles, etc')}
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          ></textarea>
          {preInput(
            'Check in&out times',
            'add check in and out times, remember to have some time window for cleaning the room between guests'
          )}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                placeholder="11"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
