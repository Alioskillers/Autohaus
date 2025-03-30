import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/cars').then(res => setCars(res.data));
  }, []);

  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Available Cars</h1>
      <input
        type="text"
        placeholder="Search by model"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCars.map((car) => (
        <div key={car._id} className="car-card">
          <h3>{car.make} {car.model}</h3>
          <p>Color: {car.color}</p>
          <p>Top Speed: {car.topSpeed} km/h</p>
          <p>Price: ${car.price}</p>
          <Link to={`/cars/${car._id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrowseCars;