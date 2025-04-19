import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { useBasket } from '../context/BasketContext';
import Spinner from '../components/Spinner';

const VipCarDetails = () => {
  const { id } = useParams();
  const { addToBasket } = useBasket();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [type, setType] = useState('purchase');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/vip/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        setError('Failed to load VIP car details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;
  if (!car) return <p style={{ padding: '2rem' }}>Car not found.</p>;

  const isOutOfStock = car.stock <= 0;

  return (
    <div style={container}>
      <h2 style={heading}>{car.make} {car.model}</h2>

      <img
        src={car.imageUrl || `https://autohaus-images.s3.eu-north-1.amazonaws.com/${car._id}.jpg`}
        alt={`${car.make} ${car.model}`}
        style={image}
      />

      <div style={infoGrid}>
        <p><strong>Color:</strong> {car.color}</p>
        <p><strong>Top Speed:</strong> {car.topSpeed} km/h</p>
        <p>
          <strong>Price:</strong> ${car.price.toLocaleString()}
          {car.oldPrice && car.oldPrice > car.price && (
            <span style={discount}>
              Was ${car.oldPrice.toLocaleString()}
            </span>
          )}
        </p>
        <p style={isOutOfStock ? outOfStock : inStock}>
          {isOutOfStock ? 'Out of Stock' : `In Stock`}
        </p>
      </div>

      <div style={toggleContainer}>
        <button
          className={`toggle-button ${type === 'purchase' ? 'active' : ''}`}
          onClick={() => setType('purchase')}
        >
          Purchase
        </button>
      </div>

      {type === 'purchase' && (
        <p style={{ marginTop: '1rem' }}>
          <strong>Delivery: 3–5 business days</strong>
        </p>
      )}

      <div style={quantityRow}>
        <label><strong>Quantity:</strong></label>
        <input
          type="number"
          min="1"
          max={car.stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={buttonWrapper}>
        <button
          onClick={() => addToBasket(car, quantity)}
          disabled={isOutOfStock}
          style={{
            ...addButton,
            backgroundColor: isOutOfStock ? '#ccc' : '#111',
            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
          }}
        >
          🛒 Add to Basket
        </button>
      </div>

      <style>
        {`
          .toggle-button {
            padding: 0.6rem 1.5rem;
            margin-right: 0.75rem;
            background: #e0e0e0;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 500;
          }
          .toggle-button.active {
            background: #111;
            color: white;
          }

          @media (max-width: 768px) {
            div[style*="padding: 2rem"] {
              padding: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// --- Styles ---
const container = {
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
  fontFamily: 'Helvetica Neue, sans-serif'
};

const heading = {
  fontSize: '2rem',
  marginBottom: '1rem',
  textAlign: 'center',
  color: '#111'
};

const image = {
  width: '100%',
  borderRadius: '12px',
  marginBottom: '1.5rem',
  maxHeight: '450px',
  objectFit: 'cover'
};

const infoGrid = {
  display: 'grid',
  gap: '0.8rem',
  marginBottom: '1rem'
};

const discount = {
  color: 'green',
  marginLeft: '0.75rem',
  fontWeight: '600'
};

const inStock = {
  color: 'green',
  fontWeight: 'bold'
};

const outOfStock = {
  color: 'red',
  fontWeight: 'bold'
};

const toggleContainer = {
  marginTop: '1.5rem',
  marginBottom: '1rem'
};

const inputStyle = {
  marginLeft: '0.75rem',
  padding: '0.4rem 0.6rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '80px'
};

const quantityRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '2rem',
  marginBottom: '1rem'
};

const buttonWrapper = {
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '0.5rem'
};

const addButton = {
  padding: '0.7rem 1.5rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  fontWeight: 'bold',
  transition: '0.2s ease-in'
};

export default VipCarDetails;