import { Outlet, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';
import AccountNav from '../components/AccountNav';

const AccountPage = () => {
  const { user, signout } = useUser();
  const location = useLocation();

  return (
    <div>
      <AccountNav location={location}></AccountNav>
      <>
        {location.pathname === '/account' ? (
          <div className="text-center max-w-lg mx-auto flex flex-col gap-4">
            <h5>
              Logged in as {user.username}{' '}
              <span className="font-semibold">({user.email})</span>
            </h5>
            <button className="primary max-w-sm mx-auto" onClick={signout}>
              Logout
            </button>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </>
    </div>
  );
};

export default AccountPage;
