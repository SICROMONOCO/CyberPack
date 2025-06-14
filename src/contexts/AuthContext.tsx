
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'editor';

interface User {
  id: string;
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  canManageContent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials - in production this would be handled by a backend
const DEMO_CREDENTIALS = {
  editor: { username: 'admin', password: 'admin123', role: 'editor' as UserRole }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cyberpack_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('cyberpack_user');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Check against demo credentials
    const credential = Object.values(DEMO_CREDENTIALS).find(
      cred => cred.username === username && cred.password === password
    );

    if (credential) {
      const newUser: User = {
        id: crypto.randomUUID(),
        username: credential.username,
        role: credential.role
      };
      
      setUser(newUser);
      localStorage.setItem('cyberpack_user', JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cyberpack_user');
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const canManageContent = user?.role === 'editor';

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
    canManageContent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
