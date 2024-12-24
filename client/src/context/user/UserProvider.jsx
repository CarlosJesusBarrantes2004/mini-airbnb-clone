import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import useMessage from '../../hooks/useMessage';
import {
  signupRequest,
  signinRequest,
  signoutRequest,
  verifyTokenRequest,
} from '../../api/auth';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setErrors } = useMessage();
  const navigate = useNavigate();

  const signup = async (user) => {
    try {
      const { data } = await signupRequest(user);
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate('/home', { replace: true });
      } else setErrors(data.errors);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (user) => {
    try {
      const { data } = await signinRequest(user);

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate('/home', { replace: true });
      } else setErrors([data.message || 'Failed to login']);
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      const { data } = await signoutRequest();
      if (data.success) {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/', { replace: true });
        console.log(data.message);
      } else {
        setErrors([data.message || 'Failed to logout']);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async () => {
    try {
      const { data } = await verifyTokenRequest();

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/signin', { replace: true });
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        setUser,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
