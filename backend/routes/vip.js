const express = require('express');
const router = express.Router();
const { getVipCars} = require('../controllers/vipController');

// Optional: Import an authentication middleware if needed
const protect = require('../middleware/authMiddleware');

// GET /vip/cars - Fetch all VIP cars from the DB
// If you want to protect this route so only users with role 'VIP' can access it, use the protect middleware.
router.get('/cars', protect(['User']), getVipCars);


module.exports = router;