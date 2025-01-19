import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import AuthContext from "./AuthContext";
import { LoginUser, RegisterUser } from "../../types/auth.types";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const register = async (user: RegisterUser) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) {
        setUser(json.user);
        setIsAuthenticated(true);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user: LoginUser) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) {
        setUser(json.user);
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/validate-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) {
        setUser(json.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    verifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
