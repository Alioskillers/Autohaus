const express = require('express');
const { getAllCars, getCarById, updateCarStockOrPrice, updateCarPrice } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');
const { addCar } = require('../controllers/carController');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();
router.put('/update-price', protect(['Workers-Admin']),updateCarPrice);
router.post('/add-car', protect(['Admin', 'Worker','Global-Admin','Workers-Admin']), addCar);
router.get('/', cacheMiddleware(() => 'cars_all', 300), getAllCars);


router.get('/:id', cacheMiddleware((req) => `car_${req.params.id}`, 300), getCarById);
router.put('/:id', protect(['Admin', 'Worker', 'Workers-Admin','Global-Admin']), updateCarStockOrPrice);
  
module.exports = router;