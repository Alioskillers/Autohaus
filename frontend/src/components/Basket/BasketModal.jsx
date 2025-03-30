import React from 'react';
import { useBasket } from '../../context/BasketContext';
import { useNavigate } from 'react-router-dom';

const BasketModal = () => {
  const { basket, removeFromBasket, clearBasket, toggleBasketModal } = useBasket();
  const navigate = useNavigate();

  const total = basket.reduce((sum, item) => sum + item.car.price * item.quantity, 0);

  return (
    <div style={overlayStyle} onClick={(e) => e.stopPropagation()}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* ❌ Close Button */}
        <button onClick={toggleBasketModal} style={closeBtn}>×</button>

        <h2 style={titleStyle}>🛒 Your Basket</h2>
        {basket.length === 0 ? (
          <p style={emptyStyle}>Your basket is empty.</p>
        ) : (
          <div style={contentStyle}>
            {basket.map((item) => (
              <div key={item.car._id} style={itemStyle}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>{item.car.make} {item.car.model}</h3>
                  <p style={subtleText}>Quantity: {item.quantity}</p>
                  <p style={subtleText}>Subtotal: <strong>${(item.car.price * item.quantity).toLocaleString()}</strong></p>
                </div>
                <button onClick={() => removeFromBasket(item.car._id)} style={removeBtn}>✖</button>
              </div>
            ))}

            <div style={footerStyle}>
              <p style={totalText}>Total: ${total.toLocaleString()}</p>
              <div style={buttonGroup}>
                <button onClick={() => {
                  toggleBasketModal();
                  navigate('/checkout');
                }} style={checkoutBtn}>
                  Proceed to Checkout
                </button>
                <button onClick={clearBasket} style={clearBtn}>Clear Basket</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const overlayStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '420px',
  backgroundColor: '#fff',
  boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
  zIndex: 2000,
  padding: '2rem',
  overflowY: 'auto',
  fontFamily: 'Helvetica Neue, sans-serif',
};

const modalStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

const closeBtn = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#333'
};

const titleStyle = {
  fontSize: '1.8rem',
  fontWeight: '600',
  marginBottom: '1.5rem',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderBottom: '1px solid #eee',
  paddingBottom: '1rem',
};

const removeBtn = {
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const footerStyle = {
  marginTop: '2rem',
};

const totalText = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const buttonGroup = {
  display: 'flex',
  gap: '1rem',
};

const checkoutBtn = {
  flex: 1,
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const clearBtn = {
  flex: 1,
  backgroundColor: '#999',
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const emptyStyle = {
  fontSize: '1.1rem',
  color: '#666',
  textAlign: 'center',
};

const subtleText = {
  fontSize: '0.95rem',
  color: '#444',
};

export default BasketModal;