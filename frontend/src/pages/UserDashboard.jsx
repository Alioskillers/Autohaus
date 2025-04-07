import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import Spinner from '../components/Spinner';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersRes, recommendedRes] = await Promise.all([
          axios.get('/orders/my-orders'),
          axios.get('/recommendations')
        ]);

        // ✅ Handle orders
        if (Array.isArray(ordersRes.data)) {
          setOrders(ordersRes.data);
        } else {
          console.warn('⚠️ Unexpected orders response:', ordersRes.data);
        }

        // ✅ Handle recommendations - correct structure check
        const recs = recommendedRes.data;
        if (Array.isArray(recs)) {
          setRecommended(recs);
        } else {
          console.warn('⚠️ Unexpected recommendations response:', recommendedRes.data);
        }

      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '3rem', backgroundColor: '#f4f4f4', fontFamily: 'Helvetica Neue, sans-serif' }}>
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111', textAlign: 'center' }}>
            Welcome
          </h1>

          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#111', marginBottom: '1rem' }}>Your Orders</h2>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map(order => (
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
            {recommended.length === 0 ? (
              <p>No recommendations available.</p>
            ) : (
              recommended.map(car => (
                <div key={car._id} style={cardStyle}>
                  <h3>{car.make} {car.model}</h3>
                  <p>Price: ${car.price.toLocaleString()}</p>
                  {car.topSpeed && <p>Top Speed: {car.topSpeed} km/h</p>}
                  {car.color && <p>Color: {car.color}</p>}
                </div>
              ))
            )}
          </section>
        </>
      )}
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