import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('/forgot-password/reset-password', {
        token,
        password,
      });

      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: '100vh',
        fontFamily: 'Helvetica Neue, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          height: isMobile ? '250px' : '100vh',
          width: '100%',
        }}
      >
        <img
          src="/reset.jpg"
          alt="Reset Visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'top center' : 'center',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f7f7',
          padding: isMobile ? '1.5rem' : '2rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: '#fff',
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '1.4rem' : '1.7rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}
          >
            Reset Password
          </h2>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.9rem',
  fontSize: '1rem',
  marginBottom: '1.3rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
};

export default ResetPassword;