import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const receipt = state?.receipt || 'N/A';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!state) return <p>Order not found.</p>;

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Helvetica Neue, sans-serif' }}>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export default OrderSuccess;