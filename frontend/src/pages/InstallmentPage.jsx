import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Spinner from '../components/Spinner';

const InstallmentPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
const buyer = state?.buyer;
const totalAmount = state?.totalAmount;
const carId = state?.carId;

  const [period, setPeriod] = useState(1);
  const [frequency, setFrequency] = useState('monthly');
  const [installmentResult, setInstallmentResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/installments/calculate', {
        totalAmount,
        period,
        frequency
      });
      setInstallmentResult(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed');
    }
    finally {
    setLoading(false);
    }
  };

  const confirmPayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/payments/installment', {
        buyer,
        totalAmount,
        period,
        frequency,
        carId
      });
      navigate('/order-success', { state: res.data });
    } catch (err) {
      setError(err.response?.data?.message || 'Installment creation failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <h2 style={styles.heading}>Choose Your Installment Plan</h2>
      <p style={{ marginBottom: '1rem' }}>Total Amount: ${totalAmount.toLocaleString()}</p>

      <label style={styles.label}>Installment Period (in years):</label>
      <input
        type="number"
        min="1"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Payment Frequency:</label>
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)} style={styles.input}>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="semi-annually">Semi-Annually</option>
        <option value="annually">Annually</option>
      </select>

      <button onClick={calculate} style={styles.calculateBtn}>Calculate Installment</button>

      {installmentResult && (
        <div style={styles.resultBox}>
          <p><strong>Total Payments:</strong> {installmentResult.totalPayments}</p>
          <p><strong>Installment Amount:</strong> ${installmentResult.installmentAmount}</p>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      <button
        onClick={confirmPayment}
        style={styles.confirmBtn}
        disabled={!installmentResult}
      >
        Confirm Payment
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Helvetica Neue, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px'
  },
  calculateBtn: {
    padding: '0.75rem',
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '1rem'
  },
  confirmBtn: {
    padding: '0.75rem',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  resultBox: {
    marginBottom: '1.5rem',
    backgroundColor: '#eee',
    padding: '1rem',
    borderRadius: '6px'
  },
  error: {
    color: 'red',
    marginTop: '0.5rem'
  }
};

export default InstallmentPage;