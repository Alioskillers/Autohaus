const express = require('express');
const { getAllCars, getCarById, updateCarStockOrPrice } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');
const { addCar } = require('../controllers/carController');

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);

router.post('/add-car', protect(['Admin', 'Worker']), addCar);
router.put('/:id', protect(['Admin', 'Worker']), updateCarStockOrPrice);

module.exports = router;