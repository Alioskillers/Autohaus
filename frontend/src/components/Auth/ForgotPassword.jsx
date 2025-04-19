import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/forgot-password/verify-reset', { email, phone });
      navigate('/enter-otp', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div style={{ ...styles.wrapper, flexDirection: isMobile ? 'column' : 'row' }}>
      <div style={{ ...styles.imageContainer, height: isMobile ? '45vh' : '100vh' }}>
        <img
          src="/forgot.jpg"
          alt="Forgot Password"
          style={{ ...styles.image, objectPosition: isMobile ? 'top center' : 'center' }}
        />
      </div>

      <div style={{ ...styles.container, height: isMobile ? 'auto' : '100vh', padding: isMobile ? '2rem 1.5rem' : 0 }}>
        <div style={{ ...styles.card, padding: isMobile ? '2rem 1.5rem' : '3rem 3rem' }}>
          <h2 style={styles.title}>Forgot Password</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    fontFamily: 'Helvetica Neue, sans-serif',
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    marginBottom: '1.2rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default ForgotPassword;