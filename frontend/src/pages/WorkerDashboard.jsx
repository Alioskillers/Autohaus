import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const WorkerDashboard = () => {
  const [cars, setCars] = useState([]);
  const [stockUpdates, setStockUpdates] = useState({});
  const [discounts, setDiscounts] = useState({});
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

  const handleDiscountChange = (id, value) => {
    setDiscounts({ ...discounts, [id]: value });
  };

  const applyDiscount = async (id) => {
    try {
      const car = cars.find((c) => c._id === id);
      const discount = parseFloat(discounts[id]);
      if (isNaN(discount) || discount <= 0 || discount >= 100) return;
      const newPrice = car.price - (car.price * (discount / 100));
      await axios.put(`/cars/${id}`, { price: newPrice.toFixed(2) });
      fetchCars();
      setDiscounts((prev) => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error('Discount failed:', err);
    }
  };

  const handleAddCarClick = () => {
    navigate('/add-car'); // Navigate to the add car page
  };

  return (
    <div style={container}>
      <h1 style={heading}>Worker Dashboard</h1>

      {/* Add Car Button */}
      <button
        onClick={handleAddCarClick}
        style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: '#28a745',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        Add a New Car
      </button>

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
                  <th>Apply Discount</th>
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
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        placeholder="%"
                        value={discounts[car._id] || ''}
                        onChange={(e) => handleDiscountChange(car._id, e.target.value)}
                        style={input}
                      />
                      <button onClick={() => applyDiscount(car._id)} style={button}>Apply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

// --- STYLES ---

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

export default WorkerDashboard;