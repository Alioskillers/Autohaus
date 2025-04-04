import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const WorkerManagement = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Worker Management Panel</h1>
      <p style={styles.subtext}>Select an action below:</p>

      <div style={styles.actions}>
        <button style={styles.button} onClick={() => navigate('/add-car')}>
        Add Car
        </button>
        <button style={styles.button} onClick={() => navigate('/add-vip-car')}>
        Add VIP Car
        </button>
        {role === 'Workers-Admin' && (
          <button style={styles.button} onClick={() => navigate('/worker/verify-update-price')}>
        Update Car Price
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Helvetica Neue, sans-serif',
    minHeight: '100vh',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#111'
  },
  subtext: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    color: '#555'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center'
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.3s',
    fontWeight: 'bold'
  }
};

export default WorkerManagement;