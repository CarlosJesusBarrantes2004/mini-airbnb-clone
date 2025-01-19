import { Navigate } from "react-router-dom";
import useUser from "../hooks/useAuth";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading } = useUser();

  return isAuthenticated && !isLoading ? (
    children
  ) : (
    <Navigate to={"/"}></Navigate>
  );
};

export default ProtectedRoutes;
