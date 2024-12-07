import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HabitDetails from './pages/HabitDetails';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits/:id" element={<HabitDetails />} />
          </Routes>
        </div>
        <div className="footer">
          <p>&copy; 2024 EcoHabit</p>
        </div>
      </div>
    </Router>
  );
};

export default App;
