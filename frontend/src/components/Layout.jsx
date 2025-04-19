import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={layoutWrapper}>
      <div style={layoutContent}>
        {children}
      </div>
    </div>
  );
};

const layoutWrapper = {
  minHeight: '100vh',
  width: '100%',
  backgroundColor: '#f7f9fb',
  overflowX: 'hidden',
};

const layoutContent = {
  paddingTop: '80px',
  paddingBottom: '2rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  boxSizing: 'border-box',
  position: 'relative',
};

export default Layout;