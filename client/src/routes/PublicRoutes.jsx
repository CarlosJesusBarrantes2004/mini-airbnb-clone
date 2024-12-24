import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PublicRoutes = ({ children }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <Navigate to={'/home'}></Navigate> : children;
};

export default PublicRoutes;
