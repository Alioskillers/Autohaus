import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get('/orders/my-orders').then(res => setOrders(res.data));
    axios.get('/recommendations').then(res => setRecommendations(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Your Dashboard</h1>

      <section>
        <h2>Past Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                {order.car.make} {order.car.model} — {order.type} — Receipt: {order.receiptNumber}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Recommended For You</h2>
        {recommendations.length === 0 ? (
          <p>No recommendations yet.</p>
        ) : (
          <ul>
            {recommendations.map((car) => (
              <li key={car._id}>
                {car.make} {car.model} - ${car.price}
              </li>
            ))}
          </ul>
        )}
      </section>

      <Link to="/cars">
        <button>Browse All Cars</button>
      </Link>
    </div>
  );
};

export default UserDashboard;