import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Spinner from '../components/Spinner';

const WorkerDashboard = () => {
  const [cars, setCars] = useState([]);
  const [vipCars, setVipCars] = useState([]);
  const [stockUpdates, setStockUpdates] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const [regularRes, vipRes] = await Promise.all([
        axios.get('/cars'),
        axios.get('/vip/cars')
      ]);
      setCars(regularRes.data);
      setVipCars(Array.isArray(vipRes.data) ? vipRes.data : vipRes.data.vipCars);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (id, value) => {
    setStockUpdates(prev => ({ ...prev, [id]: value }));
  };

  const updateStock = async (id, isVip = false) => {
    try {
      const quantity = parseInt(stockUpdates[id]);
      if (isNaN(quantity) || quantity < 0) return;
      setLoading(true);

      const endpoint = isVip
        ? `/vip/cars/${id}/stock`
        : `/cars/${id}`;

      await axios.put(endpoint, { stock: quantity });

      await fetchCars();
      setStockUpdates(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error('Stock update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (data, title, isVip = false) => (
    <section style={{ marginTop: '2rem' }}>
      <h2 style={subheading}>{title}</h2>
      {data.length === 0 ? (
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
              {data.map((car) => (
                <tr key={car._id}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.color}</td>
                  <td>{car.topSpeed} km/h</td>
                  <td>${car.price.toLocaleString()}</td>
                  <td style={{ color: car.stock <= 3 ? 'red' : '#000', fontWeight: 'bold' }}>
                    {car.stock || 0}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="New stock"
                      value={stockUpdates[car._id] || ''}
                      onChange={(e) => handleStockChange(car._id, e.target.value)}
                      style={input}
                    />
                    <button
                      onClick={() => updateStock(car._id, isVip)}
                      style={button}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  return (
    <div style={container}>
      {loading && <Spinner />}
      <h1 style={heading}>Worker Dashboard</h1>

      {renderTable(cars, 'Car Stock Overview')}
      {renderTable(vipCars, 'VIP Car Stock Overview', true)}

      <div style={styles.grid}>
        <div style={styles.card}>
          <button
            style={styles.button}
            onClick={() => navigate('/worker/verify-management')}
          >
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
  boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  marginBottom: '2rem'
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