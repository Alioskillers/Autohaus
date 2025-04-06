import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const AdminVipSettingsPage = () => {
  const [email, setEmail] = useState('');
  const [vipUsername, setVipUsername] = useState('');
  const [vipPassword, setVipPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/api/admin/vip-settings', { email, vipUsername, vipPassword });
      if (response.data.message === 'VIP settings updated for user') {
        setMessage('VIP settings updated successfully for the user.');
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        setError(response.data.message || 'Failed to update VIP settings');
      }
    } catch (err) {
      console.error('Error updating VIP settings:', err);
      setError(err.response?.data?.message || 'Error updating VIP settings');
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      {loading && <Spinner />}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.autohausHeader}>AUTOHAUS</h1>
          <h2 style={styles.stepTitle}>Set VIP Access for a User</h2>
          <p style={styles.subText}>Please enter the user email and VIP credentials below.</p>

          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}

          <form onSubmit={handleSave}>
            <input
              name="email"
              type="email"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              name="vipUsername"
              type="text"
              placeholder="Username"
              value={vipUsername}
              onChange={(e) => setVipUsername(e.target.value)}
              required
              style={styles.input}
            />

            {/* Password Input with Toggle */}
            <div style={{ position: 'relative', width: '100%', margin: '0 auto 1rem auto' }}>
              <input
                name="vipPassword"
                type="password"
                placeholder="Password"
                value={vipPassword}
                onChange={(e) => setVipPassword(e.target.value)}
                required
                style={{ ...styles.input, marginBottom: 0 }}
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    alignItems: 'center',
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
    fontWeight: 'bold'
  },
  stepTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: '1rem'
  },
  subText: {
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
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
  toggleButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '0.85rem',
    cursor: 'pointer',
    color: '#000'
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

export default AdminVipSettingsPage;