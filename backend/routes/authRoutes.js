const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // for users only
router.post('/login', login);

module.exports = router;