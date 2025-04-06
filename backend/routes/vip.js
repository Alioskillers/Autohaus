const express = require('express');
const router = express.Router();
const { getVipCars, getVipCarById, addVipCar, updateVipCarStock} = require('../controllers/vipController');

const protect = require('../middleware/authMiddleware');
router.post('/add-vip-car', addVipCar);
router.get('/cars', protect(['User','Worker','Workers-Admin']), getVipCars);

router.put('/cars/:id/stock', protect(['Worker', 'Workers-Admin']), updateVipCarStock);
router.get('/:id', protect(['User', 'Worker', 'Workers-Admin']),getVipCarById);

module.exports = router;