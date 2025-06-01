import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import Spinner from '../components/Spinner';

const CheckoutPage = () => {
  const { basket, clearBasket } = useBasket();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentType, setPaymentType] = useState('card');

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const totalAmount = basket.reduce(
      (sum, item) => sum + item.car.price * item.quantity,
      0
    );
  
    const carId = basket?.[0]?.car?._id || null;
  
    if (!carId) {
      alert("Error: No car selected or car ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
  
    if (paymentType === 'installment') {
        navigate('/installment', {
          state: { buyer, totalAmount, carId }
        });
      } else {
        navigate('/card-payment', {
          state: {
            buyer,
            basket: basket.map(item => ({
              carId: item.car._id,
              quantity: item.quantity,
              make: item.car.make,
              model: item.car.model,
              price: item.car.price
            }))
          }
        });
        }
    }

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <h2 style={styles.heading}>Checkout</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>First Name:</label>
        <input name="firstName" value={buyer.firstName} onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Last Name:</label>
        <input name="lastName" value={buyer.lastName} onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Email:</label>
        <input name="email" type="email" value={buyer.email} onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Phone Number:</label>
        <input name="phone" type="tel" value={buyer.phone} onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Address:</label>
        <textarea name="address" value={buyer.address} onChange={handleChange} required style={styles.textarea} />

        <label style={styles.label}>Payment Method:</label>
        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} style={styles.input}>
          <option value="card">Card</option>
          <option value="installment">Installment Plan</option>
        </select>

        <button type="submit" disabled={loading} style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}>
  {loading ? 'Processing...' : 'Continue'}
</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: 'Helvetica Neue, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#111',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  input: {
    marginBottom: '1rem',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px'
  },
  textarea: {
    marginBottom: '1rem',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    minHeight: '80px'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default CheckoutPage;