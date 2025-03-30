import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axiosConfig'; // adjust path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  const login = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Attempt to refresh the token and fetch user role
          const res = await axios.post('/auth/refresh', {}, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });

          const { newToken, role: refreshedRole } = res.data;

          // Update context and localStorage
          setToken(newToken);
          setRole(refreshedRole);
          localStorage.setItem('token', newToken);
          localStorage.setItem('role', refreshedRole);
        }
      } catch (err) {
        console.warn('Token refresh failed:', err);
        logout(); // fallback to logout if refresh fails
      }
    };

    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);