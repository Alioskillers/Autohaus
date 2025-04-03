import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNewAdmin = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/global-admin/create-admin', form);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Create New Admin</h1>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={styles.input}
            />
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              style={styles.input}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Temporary Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Create Admin</button>
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

export default CreateNewAdmin;