import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig'; // ✅ if you have a custom config in frontend
import { useBasket } from '../context/BasketContext';

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const receipt = state?.receipt || 'N/A'; // fixed typo

  if (!state) return <p>Order not found.</p>;

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Helvetica Neue, sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '1rem' }}>✅ Order Successful</h1>
        <p><strong>Receipt #:</strong> {receipt}</p>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Delivery Date: <strong>{new Date(state.deliveryDate).toLocaleDateString()}</strong>
        </p>
        <button
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;