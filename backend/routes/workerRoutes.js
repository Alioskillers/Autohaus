const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');
const { verifyWorker, verifyWorkerAdmin} = require('../controllers/workerController');

router.post('/add-car',protect(['Worker', 'Workers-Admin']), carController.addCar);
router.post('/verify', protect(['Worker', 'Workers-Admin']), verifyWorker);
router.post('/verify-admin', protect(['Workers-Admin']), verifyWorkerAdmin);

module.exports = router;
