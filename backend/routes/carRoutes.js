const express = require('express');
const { getAllCars, getCarById, createCar, updateCarStockOrPrice} = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', protect(['Admin', 'Worker']), createCar); // only Admins and Workers
router.put('/:id', protect(['Worker', 'Admin']), updateCarStockOrPrice);

module.exports = router;