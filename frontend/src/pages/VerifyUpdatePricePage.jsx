import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const VerifyUpdatePricePage = () => {
  const [form, setForm] = useState({ username: '', password: ''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/worker/verify', form);
      if (res.data.message === 'Verification successful') {
        navigate('/worker/update-car-price', {
          state: {
            username: form.username,
            password: form.password,
            role: 'Workers-Admin'
          }
        });
      } else {
        setError('Verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Verify Worker Admin</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleVerify}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Verify</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    backgroundColor: '#f4f4f4', fontFamily: 'Helvetica Neue, sans-serif'
  },
  card: {
    padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    width: '100%', maxWidth: '400px', textAlign: 'center'
  },
  input: {
    width: '100%', padding: '0.8rem', marginBottom: '1rem',
    border: '1px solid #ccc', borderRadius: '6px'
  },
  button: {
    width: '100%', padding: '0.9rem', backgroundColor: '#000', color: '#fff',
    fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer'
  },
  error: {
    color: 'red', marginBottom: '1rem'
  }
};

export default VerifyUpdatePricePage;