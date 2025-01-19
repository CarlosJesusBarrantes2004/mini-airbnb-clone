import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PublicRoutesProps {
  children: React.ReactNode;
}

const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <Navigate to={"/dashboard"} replace></Navigate>
  ) : (
    children
  );
};

export default PublicRoutes;
