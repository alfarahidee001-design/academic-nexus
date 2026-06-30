import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, schoolService } from '../lib/school-service';

interface AuthContextType {
  user: User | null;
  login: (role: 'admin' | 'teacher' | 'student') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    schoolService.init();
    const savedUser = localStorage.getItem('school_portal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: 'admin' | 'teacher' | 'student') => {
    const users = schoolService.getUsers();
    const foundUser = users.find((u: User) => u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('school_portal_user', JSON.stringify(foundUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('school_portal_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
