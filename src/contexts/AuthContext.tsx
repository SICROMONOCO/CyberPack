
import React, { createContext, useContext, ReactNode } from 'react';

// Simplified context for view-only app
interface AuthContextType {
  user: null;
  login: () => boolean;
  logout: () => void;
  isAuthenticated: false;
  hasRole: () => boolean;
  canManageContent: false;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value: AuthContextType = {
    user: null,
    login: () => false,
    logout: () => {},
    isAuthenticated: false,
    hasRole: () => false,
    canManageContent: false
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
