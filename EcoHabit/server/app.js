const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Plik modelu użytkownika
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Połączenie z bazą danych
mongoose.connect('mongodb://localhost:27017/ecoHabit', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Model użytkownika
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rejestracja użytkownika
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Sprawdzenie, czy użytkownik już istnieje
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Haszowanie hasła
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tworzenie nowego użytkownika
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Logowanie użytkownika
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Sprawdzenie, czy użytkownik istnieje
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Sprawdzenie hasła
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Tworzenie tokenu JWT
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

// Middleware do sprawdzania autentyczności tokenu
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Spodziewamy się tokenu w nagłówku "Authorization: Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Inne trasy, np. zabezpieczone
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Profile data', userId: req.user.userId });
});

module.exports = app;
