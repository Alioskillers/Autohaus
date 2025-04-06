import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { useAuth } from '../../auth/AuthContext';
import Spinner from '../../components/Spinner';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/auth/login', formData, {
        withCredentials: true,
      });
  
      const res = await axios.get('/auth/me', {
        withCredentials: true,
      });
  
      const role = res.data.role;
      login(role);
  
      if (role === 'Admin' || role === 'Global-Admin') navigate('/admin');
      else if (role === 'Worker' || role === 'Workers-Admin') navigate('/worker');
      else navigate('/dashboard');
  
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Helvetica Neue, sans-serif', overflow: 'hidden' }}>
      {loading && <Spinner />}
      <div style={{ flex: 1, height: '100vh', overflow: 'hidden' }}>
        <img
          src="/login.jpg"
          alt="Login Visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '380px', width: '100%' }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            letterSpacing: '1px',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            AUTOHAUS
          </h1>

          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            Welcome! Log in with your Autohaus ID
          </h2>

          <p style={{
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Please enter the e-mail address and password you registered with.
          </p>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '1rem',
                fontSize: '1rem'
              }}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.9rem',
                backgroundColor: '#000',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '1.5rem'
              }}
            >
              Login
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              onClick={() => navigate('/forgot-password')}
              style={{
                background: 'none',
                border: 'none',
                color: '#000',
                fontSize: '0.95rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontWeight: '500'
              }}
            >
              Forgot your password?
            </button>
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            margin: '1.5rem 0',
            color: '#aaa'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }} />
            <span style={{ margin: '0 1rem', fontSize: '0.85rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }} />
          </div>

          <button
            onClick={() => navigate('/signup')}
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '1px solid #000',
              background: 'transparent',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Don’t have an Autohaus ID? <strong>Sign up</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;