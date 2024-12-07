// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import HabitCard from '../components/HabitCard';
import './Dashboard.css'; // Zewnętrzny plik CSS dla tej strony

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // Symulacja pobierania danych (np. z API)
    const fetchedHabits = [
      { id: 1, name: 'Picie wody', description: 'Pij 2 litry wody dziennie' },
      { id: 2, name: 'Bieganie', description: 'Biegaj 30 minut dziennie' }
    ];
    setHabits(fetchedHabits);
  }, []);

  return (
    <div className="dashboard">
      <h2>Witaj w panelu nawyków</h2>
      <div className="habit-list">
        {habits.map(habit => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
