import { useState, createContext, useContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface SessionData {
  expiresAt: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Session duration: 1 hour
const SESSION_DURATION_MS = 60 * 60 * 1000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const sessionObj: SessionData = JSON.parse(session);
        if (sessionObj.expiresAt && Date.now() < sessionObj.expiresAt) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('session');
          setIsAuthenticated(false);
        }
      } catch (e) {
        localStorage.removeItem('session');
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Validate both username and password together to prevent username enumeration
    const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const hashedPassword = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
    
    // Always check password even if username is wrong (timing attack mitigation)
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    const isUsernameMatch = username === expectedUsername;
    
    if (isUsernameMatch && isPasswordMatch) {
      const expiresAt = Date.now() + SESSION_DURATION_MS;
      localStorage.setItem('session', JSON.stringify({ expiresAt }));
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
