import React from 'react';
import { Link } from 'react-router-dom';

const HabitCard = ({ habit }) => {
  return (
    <div className="habit-card">
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <Link to={`/habits/${habit.id}`}>Zobacz szczegóły</Link>
    </div>
  );
};

export default HabitCard;
