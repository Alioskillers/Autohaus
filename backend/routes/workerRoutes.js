const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');
const { verifyWorker, verifyWorkerAdmin} = require('../controllers/workerController');

router.post('/add-car', carController.addCar);
router.post('/verify', verifyWorker);
router.post('/verify-admin', verifyWorkerAdmin);

module.exports = router;
