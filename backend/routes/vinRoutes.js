const express = require('express');
const { verifyWorkerAdmin, searchCarByReceipt, generateVinForCar } = require('../controllers/vinController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/verify-worker-admin', protect(['Workers-Admin']), verifyWorkerAdmin);
router.get('/search-car/:receiptNumber', protect(['Workers-Admin']), searchCarByReceipt);
router.post('/generate-vin/:receiptNumber', protect(['Workers-Admin']), generateVinForCar);

module.exports = router;