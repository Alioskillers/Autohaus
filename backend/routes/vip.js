const express = require('express');
const router = express.Router();
const { getVipCars, getVipCarById, addVipCar, updateVipCarStock} = require('../controllers/vipController');
const { cacheMiddleware } = require('../middleware/cache');

const protect = require('../middleware/authMiddleware');
router.post('/add-vip-car', addVipCar);
router.get('/cars', cacheMiddleware(() => 'vip_cars_all', 300) , protect(['User','Worker','Workers-Admin']), getVipCars);

router.put('/cars/:id/stock', protect(['Worker', 'Workers-Admin']), updateVipCarStock);
router.get('/:id', cacheMiddleware((req) => `vip_car_${req.params.id}`, 300) , protect(['User', 'Worker', 'Workers-Admin']),getVipCarById);

module.exports = router;