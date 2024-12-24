import UserProvider from './user/UserProvider';
import MessageProvider from './message/MessageProvider';
import PlaceProvider from './place/PlaceProvider';
import BookingProvider from './booking/BookingProvider';

const AppProvider = ({ children }) => {
  return (
    <MessageProvider>
      <UserProvider>
        <PlaceProvider>
          <BookingProvider>{children}</BookingProvider>
        </PlaceProvider>
      </UserProvider>
    </MessageProvider>
  );
};

export default AppProvider;
