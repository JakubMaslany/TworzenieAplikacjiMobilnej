const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Obsługa rejestracji
router.post('/login', login);       // Obsługa logowania

module.exports = router;
