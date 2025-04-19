// /pages/VerifyManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerifyManagement = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/verify-management', { username, password });
      if (res.data.message === 'Verification successful') {
        navigate('/admin/manage');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.header}>ADMIN MANAGEMENT</h1>
          <p style={styles.sub}>Please verify your admin credentials</p>

          {error && <p style={styles.error}>{error}</p>}
          {loading && <Spinner />}

          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Helvetica Neue, sans-serif',
    backgroundColor: '#f7f7f7'
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center'
  },
  header: {
    fontSize: '1.6rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  sub: {
    fontSize: '0.95rem',
    marginBottom: '1.8rem',
    color: '#333'
  },
  input: {
    display: 'block',
    width: '65%',
    padding: '0.6rem',
    fontSize: '0.95rem',
    margin: '0 auto 1rem auto',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    width: '50%',
    margin: '0 auto',
    display: 'block',
    padding: '0.9rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  }
};

export default VerifyManagement;