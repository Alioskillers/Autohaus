import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { useAuth } from '../../auth/AuthContext';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', formData);
      login(res.data.token, res.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={outer}>
      <div style={card}>
        <h2 style={title}>Create Account</h2>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={input} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={input} />
          <input name="phone" type="text" placeholder="Phone Number" onChange={handleChange} required style={input} />
          <button type="submit" style={button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

const outer = {
  backgroundColor: '#f4f4f4',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica Neue, sans-serif'
};

const card = {
  backgroundColor: '#fff',
  padding: '3rem',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '480px'
};

const title = {
  textAlign: 'center',
  marginBottom: '2rem',
  fontSize: '2rem',
  color: '#111'
};

const input = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1.25rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const button = {
  width: '100%',
  padding: '0.9rem',
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const errorStyle = {
  color: 'red',
  marginBottom: '1rem'
};

export default Signup;