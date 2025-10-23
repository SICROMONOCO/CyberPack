import { useState, createContext, useContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string) => {
    const hashedPassword = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      localStorage.setItem('session', 'authenticated');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('session');
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
