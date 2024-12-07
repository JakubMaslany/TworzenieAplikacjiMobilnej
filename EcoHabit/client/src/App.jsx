import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import HabitDetails from './pages/HabitDetails';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Sidebar po lewej stronie */}
        <div className="content">
          <Navbar /> {/* Navbar, który nie zasłania formularzy */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits/:id" element={<HabitDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
