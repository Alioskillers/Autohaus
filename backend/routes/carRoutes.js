const express = require('express');
const { getAllCars, getCarById, updateCarStockOrPrice, updateCarPrice } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');
const { addCar } = require('../controllers/carController');

const router = express.Router();
router.put('/update-price', protect(['Workers-Admin']),updateCarPrice);
router.post('/add-car', protect(['Admin', 'Worker','Global-Admin','Workers-Admin']), addCar);
router.get('/', getAllCars);


router.get('/:id', getCarById);
router.put('/:id', protect(['Admin', 'Worker', 'Workers-Admin','Global-Admin']), updateCarStockOrPrice);
  
module.exports = router;