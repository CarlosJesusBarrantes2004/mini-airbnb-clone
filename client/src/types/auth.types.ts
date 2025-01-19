export interface User {
  id: string;
  username: string;
  email: string;
}

export interface RegisterUser {
  email: string;
  password: string;
  username: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (user: RegisterUser) => Promise<void>;
  login: (user: LoginUser) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
}
