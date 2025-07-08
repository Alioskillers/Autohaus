import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useBasket } from '../../context/BasketContext';

const Navbar = () => {
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
  };

  return (
    <nav style={navStyle}>
      <div style={leftSideStyle}>
      <video
  ref={(ref) => {
    if (ref) {
      ref.onended = () => {
        ref.currentTime = 0;
        ref.play();
      };
    }
  }}
          src="/logo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ height: '60px', borderRadius: '4px' }}
        />
      </div>

      <div style={centerStyle}>
        <button onClick={() => navigate('/')} style={logoStyle}>AUTOHAUS</button>
      </div>

      <div style={rightSideStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <button onClick={handleDashboardClick} style={linkButtonStyle}>Dashboard</button>
        <Link to="/cars" style={linkStyle}>Cars</Link>

        {isAuthenticated ? (
          <>
            <button onClick={() => navigate('/vip-access')} style={linkButtonStyle}>VIP Cars</button>
            <button onClick={() => navigate('/not-available')} style={linkButtonStyle}>Service Center</button>
            <button onClick={logout} style={linkButtonStyle}>Logout</button>
            <button onClick={toggleBasketModal} style={basketButtonStyle}>Cart ({basket.length})</button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: 'Helvetica Neue, sans-serif',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 999
};

const leftSideStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
};

const centerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center'
};

const rightSideStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
};

const logoStyle = {
  fontSize: '1.7rem',
  fontWeight: 'bold',
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer'
};

const linkStyle = {
  backgroundColor: '#000',
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