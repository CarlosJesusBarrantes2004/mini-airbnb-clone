import { useState } from 'react';
import PlaceContext from './PlaceContext';
import {
  getPlacesRequest,
  getPlacesByUserRequest,
  getPlaceByIdRequest,
  createPlaceRequest,
  updatePlaceRequest,
} from '../../api/place';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';

const PlaceProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const { setErrors, setSuccesses } = useMessage();
  const navigate = useNavigate();

  const fetchPlaces = async () => {
    try {
      const { data } = await getPlacesRequest();
      if (data.success) setPlaces(data.places);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlacesByUser = async () => {
    try {
      const { data } = await getPlacesByUserRequest();
      if (data.success) setUserPlaces(data.places);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlace = async (id) => {
    try {
      const { data } = await getPlaceByIdRequest(id);
      if (data.success) return data.place;
      else setErrors(data.errors);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlace = async (place) => {
    try {
      const { data } = await createPlaceRequest(place);
      if (data.success) {
        navigate('/account/places', { replace: true });
        setSuccesses(data.message);
        setUserPlaces((userPlaces) => [...userPlaces, data.place]);
      } else setErrors(data.errors);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlace = async (id, place) => {
    try {
      const { data } = await updatePlaceRequest(id, place);
      if (data.success) {
        navigate('/account/places', { replace: true });
        setSuccesses(data.message);
        setUserPlaces((userPlaces) =>
          userPlaces.map((userPlace) =>
            userPlace._id === id ? data.place : userPlace
          )
        );
      } else setErrors(data.errors);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlaceContext.Provider
      value={{
        places,
        setPlaces,
        userPlaces,
        setUserPlaces,
        createPlace,
        fetchPlacesByUser,
        fetchPlace,
        updatePlace,
        fetchPlaces,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

export default PlaceProvider;
