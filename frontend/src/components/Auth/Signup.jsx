import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { useAuth } from '../../auth/AuthContext';
import Spinner from '../../components/Spinner';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('/auth/register', formData, {
        withCredentials: true
      });
      const res = await axios.get('/auth/me', { withCredentials: true });
      const role = res.data.role;
      login(role);
      navigate('/dashboard');
  
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const stepTitles = {
    1: 'Personal Details',
    2: 'Phone Information',
    3: 'Set Password'
  };

  return (
    <div style={styles.wrapper}>
      {loading && <Spinner />}
      <div style={styles.imageContainer}>
        <img src="/signup.jpg" alt="Signup Visual" style={styles.image} />
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.autohausHeader}>Create your personal Autohaus ID</h1>
          <p style={styles.autohausSub}>Your access to the world of Autohaus</p>

          <h3 style={styles.stepTitle}>{stepTitles[step]}</h3>

          <div style={styles.stepperContainer}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={styles.stepperItem}>
                <div style={{
                  ...styles.circle,
                  backgroundColor: step === s ? '#000' : '#ccc',
                  color: step === s ? '#fff' : '#000'
                }}>{s}</div>
                <div style={{ color: step === s ? '#000' : '#999' }}>{stepTitles[s]}</div>
              </div>
            ))}
          </div>

          {error && <p style={styles.error}>{error}</p>}

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <input name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required style={styles.input} />
              <input name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required style={styles.input} />
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required style={styles.input} />
              <button type="submit" style={styles.button}>Next</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <input name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} required style={styles.input} />
              <div style={styles.navButtons}>
                <button type="button" onClick={prevStep} style={styles.backButton}>Back</button>
                <button type="submit" style={styles.button}>Next</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required style={styles.input} />
              <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} required style={{ ...styles.input, marginBottom: '1.8rem' }} />
              <div style={styles.navButtons}>
                <button type="button" onClick={prevStep} style={styles.backButton}>Back</button>
                <button type="submit" style={styles.button}>Create Account</button>
              </div>
            </form>
          )}
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
  stepTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '0.8rem'
  },
  stepperContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem'
  },
  stepperItem: {
    textAlign: 'center',
    fontSize: '0.85rem'
  },
  circle: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    margin: '0 auto 0.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem'
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
  backButton: {
    padding: '0.9rem 1.5rem',
    backgroundColor: '#eee',
    color: '#000',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginRight: '1rem',
    cursor: 'pointer'
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  }
};

export default Signup;