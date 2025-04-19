import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.imageWrapper}>
        <img
          src="/notfound.jpg"
          alt="404 Background"
          style={styles.backgroundImage}
        />
        <div style={styles.overlay}>
          <h1 style={styles.title}>404</h1>
          <p style={styles.subtitle}>Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" style={styles.buttonLink}>
            <button style={styles.button}>Go Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Helvetica Neue, sans-serif',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '90%',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  buttonLink: {
    textDecoration: 'none',
  },
};

export default NotFound;