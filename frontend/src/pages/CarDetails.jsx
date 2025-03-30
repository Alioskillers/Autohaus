import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import BuyerInfoForm from '../components/Buyer/BuyerInfoForm';
import { useBasket } from '../context/BasketContext';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToBasket } = useBasket();

  const [car, setCar] = useState(null);
  const [type, setType] = useState('purchase');
  const [period, setPeriod] = useState(1);
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  const handleStartOrder = () => {
    setShowBuyerForm(true);
  };

  const handleAddToBasket = () => {
    addToBasket(car, quantity);
  };

  const handleSubmitOrder = async (buyer) => {
    try {
      const body = {
        carId: car._id,
        type,
        ...(type === 'rent' && { period }),
        buyer  // ✅ INCLUDE buyer object here
      };

      const res = await axios.post('/orders', body);
      navigate('/order-success', { state: res.data });
    } catch (err) {
      console.error('Order failed:', err.response?.data || err.message);
    }
  };

  if (!car) return <p>Loading car details...</p>;

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

      {!showBuyerForm ? (
        <button onClick={handleStartOrder} style={button}>
          {type === 'rent' ? 'Rent Now' : 'Purchase Now'}
        </button>
      ) : (
        <BuyerInfoForm onSubmit={handleSubmitOrder} />
      )}
    </div>
  );
};

// --- Styles ---
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

export default CarDetails;