'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { dummyCurrentUser } from '../lib/dummyData';

interface AuthContextType {
  isLoggedIn: boolean;
  user: typeof dummyCurrentUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<typeof dummyCurrentUser | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');
    
    if (storedIsLoggedIn === 'true' && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === 'test@example.com' && password === 'password') {
      setIsLoggedIn(true);
      setUser(dummyCurrentUser);
      // 로컬 스토리지에 로그인 상태 저장
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(dummyCurrentUser));
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // 로컬 스토리지에서 로그인 상태 제거
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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