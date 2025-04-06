import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerifyWorkerManagement = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/worker/verify', credentials);
      if (response.data.message === 'Verification successful') {
        navigate('/worker/manage');
      } else {
        setError('Verification failed');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.response?.data?.message || 'Verification failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <div style={styles.card}>
        <h2 style={styles.title}>Worker Management Verification</h2>
        <p style={styles.subtext}>Enter your credentials to proceed</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, sans-serif'
  },
  card: {
    background: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    fontWeight: 'bold'
  },
  subtext: {
    color: '#555',
    marginBottom: '1.5rem'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  }
};

export default VerifyWorkerManagement;