import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const SearchOrdersPage = () => {
  const [query, setQuery] = useState({ email: '', phone: '', receipt: '', date: '' });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.get('/admin/orders/search', { params: query });
      setResults(res.data || []);
    } catch (err) {
      setError('Error fetching orders. Please check input.');
    }
  };

  return (
    <div style={pageStyle}>
      <h1 style={title}>Search Orders</h1>

      <form onSubmit={handleSearch} style={formStyle}>
        <input name="email" type="text" placeholder="User Email" value={query.email} onChange={handleChange} style={inputStyle} />
        <input name="phone" type="text" placeholder="Phone Number" value={query.phone} onChange={handleChange} style={inputStyle} />
        <input name="receipt" type="text" placeholder="Receipt Number" value={query.receipt} onChange={handleChange} style={inputStyle} />
        <input name="date" type="date" value={query.date} onChange={handleChange} style={inputStyle} />
        <button type="submit" style={buttonStyle}>Search</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      <div style={gridStyle}>
        {results.map(order => (
          <div key={order._id} style={cardStyle}>
            <h3>{order.car?.make} {order.car?.model}</h3>
            <p><strong>Type:</strong> {order.type}</p>
            <p><strong>Receipt:</strong> {order.receiptNumber}</p>
            <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {order.user?.phone || 'N/A'}</p>
            <p><strong>Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  padding: '2rem',
  fontFamily: 'Helvetica Neue, sans-serif',
  backgroundColor: '#f7f7f7',
  minHeight: '100vh'
};

const title = {
  fontSize: '2rem',
  marginBottom: '2rem',
  color: '#111',
  textAlign: 'center'
};

const formStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center',
  marginBottom: '2rem'
};

const inputStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  width: '240px'
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer'
};

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem',
  justifyContent: 'center'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '1.5rem',
  width: '320px',
  boxShadow: '0 6px 16px rgba(0,0,0,0.05)'
};

export default SearchOrdersPage;