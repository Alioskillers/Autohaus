import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/forgot-password/verify-reset', { email, phone });
      const { token } = res.data;
      navigate('/reset-password', { state: { token } });
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img src="/forgot.jpg" alt="Forgot Password" style={styles.image} />
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Forgot Password</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
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
    height: '100vh',
    fontFamily: 'Helvetica Neue, sans-serif',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem 3rem',
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
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
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