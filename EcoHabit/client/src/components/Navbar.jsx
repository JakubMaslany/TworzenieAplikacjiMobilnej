import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>EcoHabit</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Logowanie</Link>
        <Link to="/register">Rejestracja</Link>
        <Link to="/dashboard">Panel</Link>
      </div>
    </nav>
  );
};

export default Navbar;
