import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('/cars');
        setCars(res.data);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="browse-cars-page" style={{ padding: '3rem', fontFamily: 'Helvetica, sans-serif', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#111' }}>Available Cars</h1>

      <input
        type="text"
        placeholder="Search by model"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          outline: 'none'
        }}
      />
      {loading ? (
        <Spinner />
      ) : (

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredCars.map(car => (
          <div
            key={car._id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img
               src={`https://autohaus-images.s3.eu-north-1.amazonaws.com/${car._id}.jpg`}
              alt={`${car.make} ${car.model}`}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#222', marginBottom: '0.5rem' }}>{car.make} {car.model}</h3>
              <p style={{ margin: '0.25rem 0', color: '#555' }}>Color: {car.color}</p>
              <p style={{ margin: '0.25rem 0', color: '#555' }}>Top Speed: {car.topSpeed} km/h</p>
              <p style={{ margin: '0.25rem 0', color: '#111', fontWeight: 'bold' }}>Price: ${car.price.toLocaleString()}</p>
              <Link to={`/cars/${car._id}`}>
                <button
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.25rem',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default BrowseCars;