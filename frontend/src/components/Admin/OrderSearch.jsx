import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

const OrderSearch = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  const [filters, setFilters] = useState({ email: '', phone: '', receipt: '', date: '' });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get('/admin/orders/search', { params: filters });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Search Orders</h3>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="receipt" placeholder="Receipt #" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.length === 0 && <li>No orders found.</li>}
        {results.map(order => (
          <li key={order._id} style={{ margin: '1rem 0' }}>
            <strong>Receipt:</strong> {order.receiptNumber || 'N/A'}<br />
            <strong>User:</strong> {order.user?.email || 'N/A'}<br />
            <strong>Phone:</strong> {order.user?.phone || 'N/A'}<br />
            <strong>Car:</strong> {order.car?.make} {order.car?.model}<br />
            <strong>Total:</strong> ${order.totalAmount?.toLocaleString() || '0.00'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSearch;