import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerifyGenerateVIN = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/vin/verify-worker-admin', { username, password });
      if (res.data.message === 'Verification successful') {
        navigate('/worker/generate-vin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {loading && <Spinner />}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Verify Admin Identity to Generate VIN</h1>
          {error && <p style={styles.error}>{error}</p>}
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
    height: '100vh',
    fontFamily: 'Helvetica Neue, sans-serif'
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold'
  },
  input: {
    display: 'block',
    width: '70%',
    margin: '0.7rem auto',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px'
  },
  button: {
    width: '60%',
    padding: '0.9rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  }
};

export default VerifyGenerateVIN;