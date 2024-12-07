const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Rejestracja użytkownika
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Sprawdzanie, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik już istnieje' });
    }

    // Haszowanie hasła
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tworzenie nowego użytkownika
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera, spróbuj ponownie' });
  }
});

module.exports = router;
