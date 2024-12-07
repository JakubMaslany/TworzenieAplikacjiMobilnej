const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Rejestracja użytkownika
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sprawdzenie, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik już istnieje' });
    }

    // Haszowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tworzenie nowego użytkownika
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Logowanie użytkownika
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sprawdzenie, czy użytkownik istnieje
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
    }

    // Sprawdzenie hasła
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
    }

    // Tworzenie tokenu JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
