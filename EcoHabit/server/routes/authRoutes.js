const express = require('express');
const router = express.Router();

// Przykładowe trasy logowania i rejestracji
router.post('/login', (req, res) => {
    // Kod logowania
    res.send('Login route');
});

router.post('/register', (req, res) => {
    // Kod rejestracji
    res.send('Register route');
});

module.exports = router;
