import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import Barcode from 'react-barcode';

const GenerateVin = () => {
  const [receiptNumber, setReceiptNumber] = useState('');
  const [carInfo, setCarInfo] = useState(null);
  const [vin, setVin] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/vin/search-car/${receiptNumber}`);
      setCarInfo(res.data);
      setVin(null);
      setError('');
    } catch (err) {
      setCarInfo(null);
      setVin(null);
      setError(err.response?.data?.message || 'Failed to find car.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/vin/generate-vin/${receiptNumber}`);
      setVin(res.data.vin);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate VIN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Generate VIN for Purchased Vehicle</h2>
      <input
        type="text"
        placeholder="Enter Receipt Number"
        value={receiptNumber}
        onChange={(e) => setReceiptNumber(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>

      {error && <p style={styles.error}>{error}</p>}

      {carInfo && (
        <div style={styles.infoContainer}>
          <div>
            <h3>Car Information</h3>
            <p><strong>Make:</strong> {carInfo.make}</p>
            <p><strong>Model:</strong> {carInfo.model}</p>
            <p><strong>Color:</strong> {carInfo.color}</p>
            <p><strong>Price:</strong> {carInfo.price ? `$${parseFloat(carInfo.price).toLocaleString()}` : 'N/A'}</p>
            <p><strong>Top Speed:</strong> {carInfo.topSpeed} km/h</p>
            <p>Purchase Date: {carInfo.createdAt ? new Date(carInfo.createdAt).toLocaleString() : 'N/A'}</p>
          </div>

          <div style={{ marginTop: '1rem' }}>
            {carInfo.vin ? (
              <p style={{ fontWeight: 'bold', color: 'green' }}>VIN Already Generated: {carInfo.vin}</p>
            ) : (
              <button onClick={handleGenerate} style={styles.generateButton}>Generate VIN</button>
            )}

            {vin && (
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <h4>VIN Generated: {vin}</h4>
                <Barcode value={vin} format="CODE128" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  generateButton: {
    padding: '0.7rem 1.3rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  infoContainer: {
    marginTop: '1.5rem',
    backgroundColor: '#f4f4f4',
    padding: '1rem',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
};

export default GenerateVin;