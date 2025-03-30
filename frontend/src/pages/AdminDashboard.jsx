import React from 'react';
import TotalSales from '../components/Admin/TotalSales';
import SalesChart from '../components/Admin/SalesChart';
import OrderList from '../components/Admin/OrderList';
import AuditLogViewer from '../components/Admin/AuditLogViewer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={container}>
      <h1 style={heading}>Admin Dashboard</h1>

      <div style={grid}>
        <div style={card}><TotalSales /></div>
        <div style={card}><SalesChart /></div>
      </div>

      <div style={card}><OrderList /></div>
      <div style={card}><AuditLogViewer /></div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/admin/orders">
          <button style={button}>🔍 Search Orders</button>
        </Link>
      </div>
    </div>
  );
};

const container = {
  padding: '3rem',
  backgroundColor: '#f4f4f4',
  fontFamily: 'Helvetica Neue, sans-serif'
};

const heading = {
  fontSize: '2rem',
  marginBottom: '2rem',
  color: '#111'
};

const grid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  marginBottom: '2rem'
};

const card = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '2rem',
  boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
  flex: '1 1 48%'
};

const button = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer'
};

export default AdminDashboard;