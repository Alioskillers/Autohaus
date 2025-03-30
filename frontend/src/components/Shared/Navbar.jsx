import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useBasket } from '../../context/BasketContext';

const Navbar = () => {
  const { token, role, logout } = useAuth();
  const { basket, toggleBasketModal } = useBasket();
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (role === 'Admin') navigate('/admin');
    else if (role === 'Worker') navigate('/worker');
    else navigate('/dashboard');
  };

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>Autohaus</div>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <button onClick={handleDashboardClick} style={linkButtonStyle}>Dashboard</button>
        <Link to="/cars" style={linkStyle}>Cars</Link>

        {isAuthenticated ? (
          <>
            <button
              onClick={logout}
              style={linkButtonStyle}
            >
              Logout
            </button>
            <button onClick={toggleBasketModal} style={basketButtonStyle}>
  Cart ({basket.length})
</button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
      </div>
    </nav>
  );
};

// Styles
const navStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Helvetica Neue, sans-serif'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const linkStyle = {
  marginLeft: '1.5rem',
  textDecoration: 'none',
  color: '#fff',
  fontWeight: '500'
};

const linkButtonStyle = {
  ...linkStyle,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  font: 'inherit',
  padding: 0
};

const basketButtonStyle = {
  marginLeft: '1.5rem',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontWeight: '500',
  fontSize: '1rem',
  cursor: 'pointer',
  position: 'relative'
};

export default Navbar;