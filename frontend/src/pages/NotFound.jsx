import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for doesn't exist.</p>
    <Link to="/"><button>Go to Home</button></Link>
  </div>
);

export default NotFound;