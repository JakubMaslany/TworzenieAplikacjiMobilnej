// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Zewnętrzny plik CSS dla tego komponentu

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Tablica</Link></li>
        <li><Link to="/habits">Moje Nawyki</Link></li>
        <li><Link to="/settings">Ustawienia</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
