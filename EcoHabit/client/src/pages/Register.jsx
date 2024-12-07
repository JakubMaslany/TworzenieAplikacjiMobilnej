import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      console.log('Response:', response);
      window.location.href = '/login'; // Po udanej rejestracji przekierowanie na stronę logowania
    } catch (err) {
      console.error('Błąd rejestracji:', err);
      setError(err.response?.data?.message || 'Spróbuj ponownie');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Zarejestruj się</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
