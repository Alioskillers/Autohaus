// /src/pages/VIPAccessPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VIPAccessPage = () => {
  const [vipUsername, setVipUsername] = useState('');
  const [vipPassword, setVipPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/vip-access', { username: vipUsername, password: vipPassword });
      if (response.data.message === 'Access granted') {
        navigate('/vip');
      } else {
        setError(response.data.message || 'Access denied');
      }
    } catch (err) {
      console.error('Error verifying VIP access:', err);
      setError(err.response?.data?.message || 'Error verifying VIP access');
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img
          src="/vip.jpg.webp"
          alt="VIP Access Visual"
          style={styles.image}
        />
      </div>

      {/* Right-Side Form Container */}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.autohausHeader}>VIP ACCESS</h1>
          <p style={styles.autohausSub}>Please enter your VIP credentials that you received via email.</p>

          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="vipUsername"
              type="text"
              placeholder="Username"
              value={vipUsername}
              onChange={(e) => setVipUsername(e.target.value)}
              required
              style={styles.input}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={vipPassword}
              onChange={(e) => setVipPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button
              type="submit"
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Authenticating...' : 'Access'}
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
    height: '100vh',
    fontFamily: 'IconianSans, Helvetica Neue, sans-serif'
  },

  imageContainer: {
    flex: 1
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
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

  eerror: {
    color: 'red',
    marginBottom: '1rem'
  },

  success: {
    color: 'green',
    marginBottom: '1rem'
  }
};

export default VIPAccessPage;