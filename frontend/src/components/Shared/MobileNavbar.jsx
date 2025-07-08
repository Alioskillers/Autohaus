import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useBasket } from '../../context/BasketContext';
import '../../MobileNavbar.css';

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role, logout, isAuthenticated } = useAuth();
  const { basket, toggleBasketModal } = useBasket();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (role === 'Admin' || role === 'Global-Admin') {
      navigate('/admin');
    } else if (role === 'Worker' || role === 'Workers-Admin') {
      navigate('/worker');
    } else {
      navigate('/dashboard');
    }
    setMenuOpen(false);
  };

  return (
    <div className="mobile-navbar-container">
      <nav className="mobile-navbar">
        <button className="brand-button" onClick={() => navigate('/')}>AUTOHAUS</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <button onClick={handleDashboardClick}>Dashboard</button>
          <Link to="/cars" onClick={() => setMenuOpen(false)}>Cars</Link>

          {isAuthenticated ? (
            <>
              <button onClick={() => { navigate('/vip-access'); setMenuOpen(false); }}>VIP Cars</button>
              <button onClick={() => navigate('/not-available')} >Service Center</button>
              <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
              <button onClick={() => { toggleBasketModal(); setMenuOpen(false); }} className="basket-button">
                Cart ({basket.length})
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;