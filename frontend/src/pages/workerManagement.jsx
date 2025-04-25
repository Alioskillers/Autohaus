import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Spinner from '../components/Spinner';

const WorkerManagement = () => {
  
  const navigate = useNavigate();
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);
  const { role } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => navigate(path), 500);
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <h1 style={styles.heading}>Worker Management Panel</h1>
      <p style={styles.subtext}>Select an action below:</p>

      <div style={styles.actions}>
        <button style={styles.button} onClick={() => handleNavigate('/add-car')}>
          Add Car
        </button>
        <button style={styles.button} onClick={() => handleNavigate('/add-vip-car')}>
          Add VIP Car
        </button>
        {role === 'Workers-Admin' && (
          <>
            <button style={styles.button} onClick={() => handleNavigate('/worker/verify-update-price')}>
              Update Car Price
            </button>
            <button style={styles.button} onClick={() => handleNavigate('/worker/verify-generate-vin')}>
              Generate VIN
            </button>
          </>
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