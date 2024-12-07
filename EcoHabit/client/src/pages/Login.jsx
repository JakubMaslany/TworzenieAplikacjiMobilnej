import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Response:', response);
      // Możesz przekierować po udanym logowaniu
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Błąd logowania:', err);
      setError('Spróbuj ponownie');
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
        <button type="submit">Zaloguj się</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
