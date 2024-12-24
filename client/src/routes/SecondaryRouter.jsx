import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AccountPage from '../pages/AccountPage';
import NotFoundPage from '../pages/NotFoundPage';
import BookingsPage from '../pages/BookingsPage';
import PlacesPage from '../pages/PlacesPage';
import PlacesFormPage from '../pages/PlacesFormPage';
import PlacePage from '../pages/PlacePage';
import BookingPage from '../pages/BookingPage';

const SecondaryRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage></HomePage>}></Route>
      <Route path="/place/:id" element={<PlacePage></PlacePage>}></Route>
      <Route path="/account" element={<AccountPage></AccountPage>}>
        <Route path="bookings" element={<BookingsPage></BookingsPage>}></Route>
        <Route
          path="bookings/:id"
          element={<BookingPage></BookingPage>}
        ></Route>
        <Route
          path="places/new"
          element={<PlacesFormPage></PlacesFormPage>}
        ></Route>
        <Route
          path="places/:id"
          element={<PlacesFormPage></PlacesFormPage>}
        ></Route>
        <Route path="places" element={<PlacesPage></PlacesPage>}></Route>
      </Route>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
};

export default SecondaryRouter;
