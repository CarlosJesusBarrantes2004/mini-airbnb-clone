import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Loading from '../components/Loading';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) return <Loading></Loading>;

  return isAuthenticated && !loading ? (
    children
  ) : (
    <Navigate to={'/signin'}></Navigate>
  );
};

export default ProtectedRoutes;
