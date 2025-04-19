import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <h1 style={styles.title}>Access Denied</h1>
        <p style={styles.subtitle}>This page is not accessible on mobile devices.</p>
        <Link to="/" style={styles.link}>
          <button style={styles.button}>Return Home</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fb',
    padding: '1rem',
    textAlign: 'center',
  },
  content: {
    maxWidth: '400px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    color: '#555',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  },
};

export default Forbidden;