import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="container">
        <h2>No order data available.</h2>
        <Link to="/cars"><button>Back to Cars</button></Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Order Successful!</h1>
      <p>Your order has been placed successfully.</p>
      <p><strong>Receipt Number:</strong> {state.receiptNumber}</p>
      <p><strong>Expected Delivery Date:</strong> {new Date(state.deliveryDate).toLocaleDateString()}</p>

      <Link to="/dashboard"><button style={{ marginRight: '1rem' }}>Go to Dashboard</button></Link>
      <Link to="/cars"><button>Browse More Cars</button></Link>
    </div>
  );
};

export default OrderSuccess;