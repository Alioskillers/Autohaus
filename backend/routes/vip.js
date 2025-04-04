const express = require('express');
const router = express.Router();
const { getVipCars, getVipCarById, addVipCar} = require('../controllers/vipController');

const protect = require('../middleware/authMiddleware');
router.post('/add-vip-car', addVipCar);
router.get('/cars', protect(['User']), getVipCars);


router.get('/:id', protect(['User']),getVipCarById);

module.exports = router;