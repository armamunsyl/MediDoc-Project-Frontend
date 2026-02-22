import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'MediDoc_demo_user';

const DEMO_ACCOUNTS = {
  'general@gmail.com': {
    email: 'general@gmail.com',
    name: 'General User',
    role: 'general',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  'dr@gmail.com': {
    email: 'dr@gmail.com',
    name: 'Dr. Demo Account',
    role: 'doctor',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed?.email && DEMO_ACCOUNTS[parsed.email]) {
        setCurrentUser(DEMO_ACCOUNTS[parsed.email]);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = (email) => {
    const normalized = String(email || '').trim().toLowerCase();
    const account = DEMO_ACCOUNTS[normalized];
    if (!account) return { ok: false, message: 'Invalid demo account email.' };

    setCurrentUser(account);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: account.email }));
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ currentUser, login, logout, demoAccounts: Object.values(DEMO_ACCOUNTS) }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
