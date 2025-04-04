import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const WorkerDashboard = () => {
  const [cars, setCars] = useState([]);
  const [stockUpdates, setStockUpdates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await axios.get('/cars');
    setCars(res.data);
  };

  const handleStockChange = (id, value) => {
    setStockUpdates({ ...stockUpdates, [id]: value });
  };

  const updateStock = async (id) => {
    try {
      const quantity = parseInt(stockUpdates[id]);
      if (isNaN(quantity) || quantity < 0) return;
      await axios.put(`/cars/${id}`, { stock: quantity });
      fetchCars();
      setStockUpdates((prev) => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error('Stock update failed:', err);
    }
  };

  return (
    <div style={container}>
      <h1 style={heading}>Worker Dashboard</h1>

      <section>
        <h2 style={subheading}>Car Stock Overview</h2>
        {cars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          <div style={scrollWrapper}>
            <table style={table}>
              <thead>
                <tr>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Top Speed</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Update Stock</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id}>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.color}</td>
                    <td>{car.topSpeed} km/h</td>
                    <td>${car.price.toLocaleString()}</td>
                    <td>{car.stock || 0}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        placeholder="New stock"
                        value={stockUpdates[car._id] || ''}
                        onChange={(e) => handleStockChange(car._id, e.target.value)}
                        style={input}
                      />
                      <button onClick={() => updateStock(car._id)} style={button}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div style={styles.grid}>
        <div style={styles.card}>
          <button style={styles.button} onClick={() => navigate('/worker/verify-management')}>
          Management
          </button>
        </div>
      </div>
    </div>
  );
};

const container = {
  padding: '2rem',
  fontFamily: 'Helvetica Neue, sans-serif',
  backgroundColor: '#f7f7f7',
  minHeight: '100vh'
};

const heading = {
  fontSize: '2rem',
  marginBottom: '1.5rem',
  color: '#111'
};

const subheading = {
  fontSize: '1.25rem',
  marginBottom: '1rem',
  color: '#333'
};

const scrollWrapper = {
  overflowX: 'auto',
  borderRadius: '10px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.05)'
};

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  minWidth: '900px'
};

const input = {
  padding: '0.4rem',
  width: '80px',
  marginRight: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

const button = {
  padding: '0.4rem 0.75rem',
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '0.9rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const styles = {
  grid: {
    display: 'flex',
    gap: '2rem',
    marginTop: '3rem'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    flex: '1',
    textAlign: 'center'
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default WorkerDashboard;