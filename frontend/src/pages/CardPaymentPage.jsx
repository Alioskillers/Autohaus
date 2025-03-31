import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import axios from '../api/axiosConfig';

const cardLogos = {
  Visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  MasterCard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
  AmEx: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1202px-American_Express_logo_%282018%29.svg.png'
};

const CardPaymentPage = () => {
  const navigate = useNavigate();
  const { clearBasket } = useBasket();
  const { state } = useLocation();
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [maskedCard, setMaskedCard] = useState(false);
  const [maskedCvv, setMaskedCvv] = useState(false);

  const detectCardType = (number) => {
    if (!number) return ''; // avoid crashing on empty/undefined
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'MasterCard';
    if (clean.startsWith('34') || clean.startsWith('37')) return 'AmEx';
    return '';
  };

  useEffect(() => {
    setCardType(detectCardType(cardNumber)); // always set card type
    if (cardNumber.length >= 12) {
      const timeout = setTimeout(() => {
        setMaskedCard(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setMaskedCard(false);
    }
  }, [cardNumber]);
  
  useEffect(() => {
    if (cvv.length === 3) { // Mask only if full CVV is entered
      const timeout = setTimeout(() => {
        setMaskedCvv(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setMaskedCvv(false); // Unmask if incomplete
    }
  }, [cvv]);

  const handlePayment = async () => {
    try {
      const response = await axios.post('/payments/card', {
        buyer: state.buyer,
        basket: state.basket
      });
      clearBasket();
      navigate('/order-success', { state: response.data });
    } catch (err) {
      console.error('Card payment failed:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Card Information</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={cardholder}
          onChange={(e) => setCardholder(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
  <label style={styles.label}>Card Number</label>
  <input
    type="text"
    placeholder="4111 1111 1111 1111"
    value={
      maskedCard && cardNumber.length >= 4
        ? '•••• •••• •••• ' + cardNumber.slice(-4)
        : cardNumber
    }
    onChange={(e) => {
        const rawValue = e.target.value?.replace(/\D/g, '') || ''; // safe fallback
        const formatted = rawValue
          .match(/.{1,4}/g)
          ?.join(' ')
          .slice(0, 19) || ''; // fallback to empty string
      
        setCardNumber(formatted);
        setMaskedCard(false);
      }}
    style={styles.input}
  />

  {/* ✅ Only one logo rendered below the input */}
  {cardType && (
    <div style={styles.logoContainer}>
      <img src={cardLogos[cardType]} alt={cardType} style={styles.logoSmall} />
    </div>
  )}
</div>

      <div style={styles.inlineGroup}>
        <div style={{ flex: 1, marginRight: '0.5rem' }}>
          <label style={styles.label}>Expiry Date</label>
          <input
            type="text"
            placeholder="12/25"
            value={expiry}
            onChange={(e) => {
                let input = e.target.value.replace(/\D/g, ''); // remove non-digits
              
                if (input.length >= 3) {
                  input = input.slice(0, 2) + '/' + input.slice(2, 4); // auto-insert slash
                }
              
                setExpiry(input);
              }}
            style={styles.input}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>CVV</label>
          <input
            type={maskedCvv ? 'password' : 'text'}
            placeholder="123"
            value={maskedCvv && cvv.length === 3 ? '•••' : cvv}
            onChange={(e) => {
              setCvv(e.target.value);
              setMaskedCvv(false);
            }}
            style={styles.input}
          />
        </div>
      </div>

      <button onClick={handlePayment} style={styles.button}>Pay Now</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: 'Helvetica Neue, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  inlineGroup: {
    display: 'flex',
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  logo: {
    height: '24px',
    display: 'block',
    margin: '0.5rem auto 0 auto'
  },
  logoLeftUnder: {
    height: '18px',
    marginTop: '0.5rem',
    marginLeft: '0.25rem',
    display: 'block',
    alignSelf: 'flex-start'
  }
  ,logoContainer: {
    marginTop: '0.4rem',
    marginLeft: '0.25rem'
  },
  logoSmall: {
    height: '16px',
    display: 'block'
  }
};

export default CardPaymentPage;