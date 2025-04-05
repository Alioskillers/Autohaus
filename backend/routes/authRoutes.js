const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login, getProfile, logout } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register); // Only for Users
router.post('/login', login);
router.get('/me',protect(), getProfile);
router.post('/logout', logout);

module.exports = router;