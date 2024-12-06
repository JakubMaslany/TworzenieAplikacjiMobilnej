import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', frequency: '' });

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await api.get(`/habits/${id}`);
        setHabit(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          frequency: response.data.frequency,
        });
      } catch (err) {
        console.error('Failed to fetch habit');
      }
    };
    fetchHabit();
  }, [id]);

  const handleEdit = async () => {
    try {
      await api.put(`/habits/${id}`, formData);
      alert('Habit updated successfully!');
      setEditing(false);
    } catch (err) {
      alert('Failed to update habit.');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/habits/${id}`);
      alert('Habit deleted successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to delete habit.');
    }
  };

  if (!habit) return <div>Loading...</div>;

  return (
    <div>
      {!editing ? (
        <div>
          <h1>{habit.name}</h1>
          <p>{habit.description}</p>
          <p>Frequency: {habit.frequency}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default HabitDetails;
