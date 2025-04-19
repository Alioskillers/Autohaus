import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AdminManagement = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  const handleNavigation = (path) => {
    setLoading(true);
    navigate(path);
  };

  return (
    <div style={styles.wrapper}>
      {loading && <Spinner />}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.header}>Admin Management</h1>
          <p style={styles.sub}>Choose an administrative action:</p>

          <button onClick={() => handleNavigation('/admin/verify-new-admin')} style={styles.button}>
            Add New Admin
          </button>
          <button onClick={() => handleNavigation('/admin/verify-password')} style={styles.button}>
            Add A VIP User
          </button>
          <button onClick={() => handleNavigation('/admin/orders')} style={styles.button}>
            Search Orders
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Helvetica Neue, sans-serif',
    backgroundColor: '#f7f7f7'
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
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
  header: {
    fontSize: '1.6rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  sub: {
    fontSize: '0.95rem',
    marginBottom: '1.8rem',
    color: '#333'
  },
  button: {
    width: '70%',
    padding: '0.9rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '1rem'
  }
};

export default AdminManagement;