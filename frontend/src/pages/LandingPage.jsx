import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
    const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  return (
    <div style={{ marginTop: '4rem' }}>
  <h2>Featured Cars</h2>
  <div className="car-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {cars.map(car => (
      <div key={car._id} className="car-card" style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem', width: '300px' }}>
        <h3>{car.make} {car.model}</h3>
        {car.image && (
          <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          style={{ width: '100%', height: 'auto' }}
        />
        )}
        <p>Price: ${car.price.toLocaleString()}</p>
        <p>Top Speed: {car.topSpeed} km/h</p>
      </div>
    ))}
  </div>
</div>
  );
};

export default LandingPage;