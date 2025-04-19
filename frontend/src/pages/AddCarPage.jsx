import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AddCarPage = () => {
  const [loading, setLoading] = useState(false)
  const [car, setCar] = useState({
    make: '',
    model: '',
    color: '',
    price: '',
    topSpeed: '',
    stock: '',
    image: '',
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const carData = {
      ...car,
      price: Number(car.price),
      stock: Number(car.stock),
      topSpeed: Number(car.topSpeed),
    };
  
    try {
      const response = await axios.post('/cars/add-car', carData);
      navigate('/worker');
    } catch (err) {
      console.error('Error adding car:', err);
      alert('Error adding car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <h1 style={styles.title}>Add New Car</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="make"
          value={car.make}
          onChange={handleChange}
          placeholder="Make"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
          placeholder="Model"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="color"
          value={car.color}
          onChange={handleChange}
          placeholder="Color"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          value={car.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="topSpeed"
          value={car.topSpeed}
          onChange={handleChange}
          placeholder="Top Speed"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="stock"
          value={car.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="image"
          value={car.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Car</button>
      </form>
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
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    padding: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AddCarPage;