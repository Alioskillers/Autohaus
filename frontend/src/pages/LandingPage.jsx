import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <div
        style={{
          height: '100vh',
          backgroundImage: `url("/background.avif")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Welcome to Autohaus
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Explore and rent or purchase high-end cars.
        </p>
        <Link to="/signup">
          <button style={heroButtonStyle}>Get Started</button>
        </Link>
      </div>
      <div
        style={{
          padding: '3rem 1.5rem',
          fontFamily: 'Helvetica Neue, sans-serif',
          backgroundColor: '#f7f7f7',
          minHeight: '100vh',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: '#111',
          }}
        >
          Featured Cars
        </h2>
        <div style={gridStyle}>
          {cars.map((car) => (
            <div
              key={car._id}
              style={{
                ...cardStyle,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
              }}
            >
              {car.image && (
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  style={imageStyle}
                />
              )}
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111' }}>
                  {car.make} {car.model}
                </h3>
                <button style={exploreButtonStyle}>Explore</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const heroButtonStyle = {
  padding: '0.9rem 2rem',
  fontSize: '1.1rem',
  backgroundColor: '#fff',
  color: '#000',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '2rem',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  width: '300px',
  textAlign: 'center',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const exploreButtonStyle = {
  padding: '0.5rem 1.2rem',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default LandingPage;