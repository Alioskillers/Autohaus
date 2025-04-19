import React, { useEffect, useState } from 'react';
import TotalSales from '../components/Admin/TotalSales';
import SalesChart from '../components/Admin/SalesChart';
import OrderList from '../components/Admin/OrderList';
import AuditLogViewer from '../components/Admin/AuditLogViewer';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Analytics Overview</h2>
        <div style={styles.grid}>
          <div style={styles.card}><TotalSales /></div>
          <div style={styles.card}><SalesChart /></div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Recent Orders</h2>
        <div style={styles.cardWide}>
          <OrderList />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>System Audit Logs</h2>
        <div style={styles.cardWide}>
          <AuditLogViewer />
        </div>
      </section>

      <section style={styles.section}>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={() => navigate('/admin/verify-management')}
            style={styles.managementButton}
          >
            Management
          </button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Helvetica Neue, sans-serif',
    minHeight: '100vh'
  },
  heading: {
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#000',
    marginBottom: '2.5rem'
  },
  subheading: {
    fontSize: '1.6rem',
    color: '#222',
    fontWeight: 'bold',
    marginBottom: '1.25rem'
  },
  section: {
    marginBottom: '3.5rem'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
    flex: '1 1 48%'
  },
  cardWide: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.07)',
    width: '100%',
    overflowX: 'auto'
  },
  managementButton: {
    padding: '0.85rem 2rem',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AdminDashboard;