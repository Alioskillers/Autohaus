import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const WorkerDashboard = () => {
  const [cars, setCars] = useState([]);
  const [stockUpdates, setStockUpdates] = useState({});
  const [discounts, setDiscounts] = useState({});

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

  return (
    <div className="container">
      <h1>Worker Dashboard</h1>

      <section>
        <h2>Car Stock Overview</h2>
        {cars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          <table>
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
                  <td>${car.price}</td>
                  <td>{car.stock || 0}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="New stock"
                      value={stockUpdates[car._id] || ''}
                      onChange={(e) => handleStockChange(car._id, e.target.value)}
                    />
                    <button onClick={() => updateStock(car._id)}>Update</button>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      placeholder="%"
                      value={discounts[car._id] || ''}
                      onChange={(e) => handleDiscountChange(car._id, e.target.value)}
                    />
                    <button onClick={() => applyDiscount(car._id)}>Apply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default WorkerDashboard;