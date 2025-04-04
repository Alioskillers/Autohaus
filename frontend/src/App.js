import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { BasketProvider } from './context/BasketContext';
import { useBasket } from './context/BasketContext';

import Layout from './components/Layout';

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
import VIPCarDetails from './pages/vipCarDetails';
import VerifyNewAdmin from './pages/VerifyNewAdmin';
import CreateNewAdmin from './pages/CreateNewAdmin';

const AppContent = () => {
  const { showBasket, toggleBasketModal } = useBasket();

  return (
    <>
      <Navbar />
      {showBasket && <BasketModal isOpen={showBasket} onClose={toggleBasketModal} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vip-access" element={
          <ProtectedRoute allowedRoles={['User']}>
            <VIPAccessPage />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <UserDashboard />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/vip"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <VIPPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/vip/cars/:id"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <VIPCarDetails />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/cars"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <BrowseCars />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/cars/:id"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <CarDetails />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/order-success"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <OrderSuccess />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <CheckoutPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/installment"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <InstallmentPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/card-payment"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['User']}>
                <CardPaymentPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/add-car"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Worker']}>
                <AddCarPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Admin', 'Global-Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Admin', 'Global-Admin']}>
                <SearchOrdersPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/verify-password"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Admin', 'Global-Admin']}>
                <AdminVerifyPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/vip-settings"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Admin', 'Global-Admin']}>
                <AdminVipSettingsPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/verify-new-admin"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Admin', 'Global-Admin']}>
                <VerifyNewAdmin />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/create-new-admin"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Global-Admin']}>
                <CreateNewAdmin />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/worker"
          element={
            <Layout>
              <ProtectedRoute allowedRoles={['Worker']}>
                <WorkerDashboard />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
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