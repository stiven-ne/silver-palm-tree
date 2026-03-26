import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Silver Palm Tree</h1>
      {token && (
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/transactions">Transazioni</Link></li>
          <li><Link to="/budget">Budget</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;