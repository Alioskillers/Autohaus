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
    <main style={{ paddingTop: '80px' }}>
      <div style={{ padding: '3rem 1.5rem', fontFamily: 'Helvetica Neue, sans-serif', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#111', marginBottom: '1rem' }}>Welcome to Autohaus</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>Explore and rent or purchase high-end cars.</p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/signup">
              <button style={buttonStyle}>Sign Up</button>
            </Link>
          </div>
        </div>

        <section>
          <h2 style={{ fontSize: '2rem', color: '#111', marginBottom: '1.5rem', textAlign: 'center' }}>Featured Cars</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {cars.map((car) => (
              <div key={car._id} style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                width: '300px',
                textAlign: 'center',
                overflow: 'hidden'
              }}>
                {car.image && (
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0', color: '#111' }}>
                    {car.make} {car.model}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease'
};

export default LandingPage;