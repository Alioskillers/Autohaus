import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Navbar = () => {
  const { token, role, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      {token ? (
        <>
          {role === 'Admin' && <Link to="/admin" style={{ marginRight: '1rem' }}>Admin</Link>}
          {role === 'Worker' && <Link to="/worker" style={{ marginRight: '1rem' }}>Worker</Link>}
          {role === 'User' && <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>}
          <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;