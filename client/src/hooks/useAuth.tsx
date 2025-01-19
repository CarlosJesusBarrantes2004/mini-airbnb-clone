import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export default useAuth;