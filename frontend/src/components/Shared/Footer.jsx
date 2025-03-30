import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Autohaus. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#eaeaea',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  fontFamily: 'Helvetica Neue, sans-serif',
  color: '#555',
  marginTop: '2rem'
};

export default Footer;