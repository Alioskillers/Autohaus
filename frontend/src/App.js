import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { BasketProvider } from './context/BasketContext';
import { useBasket } from './context/BasketContext';
import { useAuth } from './auth/AuthContext';

// Shared Components
import Navbar from './components/Shared/Navbar';
import BasketModal from './components/Basket/BasketModal';

// Auth Components
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
import SearchOrdersPage from './pages/SearchOrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import InstallmentPage from './pages/InstallmentPage';
import CardPaymentPage from './pages/CardPaymentPage';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import AddCarPage from './pages/AddCarPage';
import VIPPage from './pages/VIPPage';
import VIPAccessPage from './pages/VIPAccessPage';
import AdminVerifyPage from './pages/AdminVerifyPage';
import AdminVipSettingsPage from './pages/AdminVipSettingsPage';

const AppContent = () => {
  const { showBasket, toggleBasketModal } = useBasket();

  return (
    <>
      <Navbar />
      {showBasket && <BasketModal isOpen={showBasket} onClose={toggleBasketModal} />}
      <Routes>
        <Route path="/admin/orders" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <SearchOrdersPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['User']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/vip" element={
          <ProtectedRoute allowedRoles={['User']}>
            <VIPPage />
          </ProtectedRoute>
        } />
        <Route path="/vip-access" element={
          <ProtectedRoute allowedRoles={['User']}>
            <VIPAccessPage />
          </ProtectedRoute>
        } />
        <Route 
  path="/admin/verify-password" 
  element={
    <ProtectedRoute allowedRoles={['Admin']}>
      <AdminVerifyPage />
    </ProtectedRoute>
  } 
/>
<Route path="/admin/vip-settings" element={
  <ProtectedRoute allowedRoles={['Admin']}>
    <AdminVipSettingsPage />
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
        <Route path="/checkout" element={
          <ProtectedRoute allowedRoles={['User']}>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/installment" element={
          <ProtectedRoute allowedRoles={['User']}>
            <InstallmentPage />
          </ProtectedRoute>
        } />
        <Route path="/card-payment" element={
          <ProtectedRoute allowedRoles={['User']}>
            <CardPaymentPage />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-car" element={
          <ProtectedRoute allowedRoles={['Worker']}>
            <AddCarPage />
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
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BasketProvider>
        <Router>
          <AppContent />
        </Router>
      </BasketProvider>
    </AuthProvider>
  );
};

export default App;