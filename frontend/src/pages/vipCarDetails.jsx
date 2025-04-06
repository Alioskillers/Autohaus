import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { useBasket } from '../context/BasketContext';
import Spinner from '../components/Spinner';


const VIPCarDetails = () => {
  const { id } = useParams();
  const { addToBasket } = useBasket();
  const [car, setCar] = useState(null);
  const [type, setType] = useState('purchase');
  const [period, setPeriod] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/vip/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCar();
  }, [id]);

  if (loading) return <Spinner />;
if (!car) return <p>Car not found.</p>;

  return (
    <div style={container}>
      <h2 style={heading}>{car.make} {car.model}</h2>
      {car.image && (
        <img src={car.image} alt={`${car.make} ${car.model}`} style={image} />
      )}
      <p><strong>Color:</strong> {car.color}</p>
      <p><strong>Top Speed:</strong> {car.topSpeed} km/h</p>
      <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>

      <div style={{ marginTop: '1rem' }}>
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
      </div>

      {type === 'rent' && (
        <div style={{ marginTop: '1rem' }}>
          <label>Rental Period (days):</label>
          <input
            type="number"
            min="1"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={{ marginLeft: '0.5rem', width: '60px' }}
        />
        <button
          onClick={() => addToBasket(car, quantity)}
          style={{ ...button, marginLeft: '1rem', backgroundColor: '#444' }}
        >
          🛒 Add to Basket
        </button>
      </div>
    </div>
  );
};

const container = {
  padding: '2rem',
  maxWidth: '700px',
  margin: '0 auto',
  fontFamily: 'Helvetica Neue, sans-serif',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
};

const heading = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '#111'
};

const image = {
  width: '100%',
  maxHeight: '400px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '1rem'
};

const button = {
  marginTop: '1.5rem',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default VIPCarDetails;