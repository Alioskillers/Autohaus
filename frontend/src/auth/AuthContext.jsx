// src/auth/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/auth/me', { withCredentials: true });
      setRole(res.data.role);
    } catch (err) {
      console.warn('Profile fetch failed:', err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (roleFromLogin) => {
    setRole(roleFromLogin);
  };

  const logout = async () => {
    await axios.post('/auth/logout', {}, { withCredentials: true });
    setRole(null);
  };

  const isAuthenticated = !!role;

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ role, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);