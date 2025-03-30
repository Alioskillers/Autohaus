import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [type, setType] = useState('purchase');
  const [period, setPeriod] = useState(1);

  useEffect(() => {
    axios.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  const handleOrder = async () => {
    const body = { carId: car._id, type };
    if (type === 'rent') body.period = period;
    const res = await axios.post('/orders', body);
    navigate('/order-success', { state: res.data });
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{car.make} {car.model}</h2>
      <p>Color: {car.color}</p>
      <p>Top Speed: {car.topSpeed} km/h</p>
      <p>Price: ${car.price}</p>

      <label>
        <input
          type="radio"
          value="purchase"
          checked={type === 'purchase'}
          onChange={(e) => setType(e.target.value)}
        /> Purchase
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input
          type="radio"
          value="rent"
          checked={type === 'rent'}
          onChange={(e) => setType(e.target.value)}
        /> Rent
      </label>

      {type === 'rent' && (
        <>
          <label>Rental Period (days):</label>
          <input
            type="number"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            min="1"
          />
        </>
      )}

      <button onClick={handleOrder}>
        {type === 'rent' ? 'Rent Now' : 'Purchase Now'}
      </button>
    </div>
  );
};

export default CarDetails;