const express = require('express');
const jwt = require('jsonwebtoken');
const {
  register,
  login
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Only for Users
router.post('/login', login);

module.exports = router;