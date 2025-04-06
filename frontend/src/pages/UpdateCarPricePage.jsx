import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const UpdateCarPricePage = () => {
  const [form, setForm] = useState({ make: '', model: '', price: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { username, password } = location.state || {};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!username || !password) {
      setMessage('Verification credentials are missing. Please verify again.');
      navigate('/worker/verify-admin');
      return;
    }

    try {
      const response = await axios.put('/cars/update-price', {
        make: form.make,
        model: form.model,
        price: Number(form.price),
        username,
        password,
        role: 'Workers-Admin'
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update price');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <h1 style={styles.title}>Update Car Price</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="make" placeholder="Car Make" value={form.make} onChange={handleChange} style={styles.input} required />
        <input name="model" placeholder="Car Model" value={form.model} onChange={handleChange} style={styles.input} required />
        <input name="price" type="number" placeholder="New Price" value={form.price} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Update Price</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: 'Helvetica Neue, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    padding: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    color: '#555',
    textAlign: 'center'
  }
};

export default UpdateCarPricePage;