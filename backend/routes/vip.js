const express = require('express');
const router = express.Router();
const { getVipCars, getVipCarById} = require('../controllers/vipController');

const protect = require('../middleware/authMiddleware');

router.get('/cars', protect(['User']), getVipCars);
router.get('/:id', protect(['User']),getVipCarById);

module.exports = router;