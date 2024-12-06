import React, { useState, useEffect } from 'react';
import api from '../api';
import HabitCard from '../components/HabitCard';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get('/habits');
        setHabits(response.data);
      } catch (err) {
        console.error('Failed to fetch habits');
      }
    };
    fetchHabits();
  }, []);

  return (
    <div>
      <h1>Your Habits</h1>
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </div>
  );
};

export default Dashboard;
