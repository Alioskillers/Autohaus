import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;