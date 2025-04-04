import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ paddingTop: '100px' }}>
      {children}
    </div>
  );
};

export default Layout;