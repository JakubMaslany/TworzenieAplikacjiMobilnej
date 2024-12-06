import React from 'react';
import { Link } from 'react-router-dom';

const HabitCard = ({ habit }) => (
  <div className="habit-card">
    <h3>{habit.name}</h3>
    <p>{habit.description}</p>
    <Link to={`/habits/${habit._id}`}>View Details</Link>
  </div>
);

export default HabitCard;
