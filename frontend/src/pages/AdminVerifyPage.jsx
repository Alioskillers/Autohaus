// /src/pages/AdminVerifyPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminVerifyPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/admin/verify-password', { email, password });
      if (response.data.message === 'Verification successful') {
        navigate('/admin/vip-settings');
      } else {
        setError(response.data.message || 'Verification failed');
      }
    } catch (err) {
      console.error('Error verifying admin password:', err);
      setError(err.response?.data?.message || 'Error verifying password');
    }
    setLoading(false);
  };

    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.autohausHeader}>ADMIN VERIFICATION</h1>
            <p style={styles.autohausSub}>Please verify your admin account</p>
  
            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}
            <form onSubmit={handleVerify}>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
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
    fontFamily: 'IconianSans, Helvetica Neue, sans-serif'
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7'
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
  autohausHeader: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    fontFamily: 'IconianSans, Helvetica Neue, sans-serif'
  },
  autohausSub: {
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
  },
  success: {
    color: 'green',
    marginBottom: '1rem'
  }
};

export default AdminVerifyPage;