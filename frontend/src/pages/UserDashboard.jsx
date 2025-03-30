import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    axios.get('/orders/my-orders')
      .then(res => {
        if (Array.isArray(res.data)) setOrders(res.data);
        else console.warn('Unexpected orders response:', res.data);
      })
      .catch(err => console.error('Order fetch error:', err));

    axios.get('/recommendations')
      .then(res => {
        if (Array.isArray(res.data)) setRecommended(res.data);
        else console.warn('Unexpected recommendations response:', res.data);
      })
      .catch(err => console.error('Recommendation fetch error:', err));
  }, []);

  return (
    <div style={{ padding: '3rem', backgroundColor: '#f4f4f4', fontFamily: 'Helvetica Neue, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111', textAlign: 'center' }}>Welcome</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#111', marginBottom: '1rem' }}>Your Orders</h2>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          Array.isArray(orders) && orders.map(order => (
            <div key={order._id} style={cardStyle}>
              <h3>{order.car?.make} {order.car?.model}</h3>
              <p>Type: {order.type}</p>
              <p>Receipt: {order.receiptNumber}</p>
              <p>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', color: '#111', marginBottom: '1rem' }}>Recommended for You</h2>
        {Array.isArray(recommended) && recommended.length === 0 ? (
          <p>No recommendations available.</p>
        ) : (
          Array.isArray(recommended) && recommended.map(car => (
            <div key={car._id} style={cardStyle}>
              <h3>{car.make} {car.model}</h3>
              <p>Price: ${car.price.toLocaleString()}</p>
              <p>Top Speed: {car.topSpeed} km/h</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '1.5rem',
  marginBottom: '1rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
};

export default UserDashboard;