// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import HabitDetails from './pages/HabitDetails';
import './App.css'; // Globalne style aplikacji

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits/:id" element={<HabitDetails />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
