import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

// Shared components
import Navbar from './components/Shared/Navbar';

// Auth pages
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Pages
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import BrowseCars from './pages/BrowseCars';
import CarDetails from './pages/CarDetails';
import OrderSuccess from './pages/OrderSuccess';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './auth/ProtectedRoute';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  
  <Route path="/dashboard" element={
    <ProtectedRoute allowedRoles={['User']}>
      <UserDashboard />
    </ProtectedRoute>
  } />
  <Route path="/cars" element={
    <ProtectedRoute allowedRoles={['User']}>
      <BrowseCars />
    </ProtectedRoute>
  } />
  <Route path="/cars/:id" element={
    <ProtectedRoute allowedRoles={['User']}>
      <CarDetails />
    </ProtectedRoute>
  } />
  <Route path="/order-success" element={
    <ProtectedRoute allowedRoles={['User']}>
      <OrderSuccess />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['Admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  } />
  <Route path="/worker" element={
    <ProtectedRoute allowedRoles={['Worker']}>
      <WorkerDashboard />
    </ProtectedRoute>
  } />

  <Route path="*" element={<NotFound />} />
</Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;