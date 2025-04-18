import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const EnterOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/forgot-password/verify-otp', { email, otp });
      const { token } = res.data;
      navigate('/reset-password', { state: { token } });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Enter OTP</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Verify OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  },
  card: {
    width: '100%',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#111',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
};

export default EnterOtp;