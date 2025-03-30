// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { processCardPayment, processInstallmentPayment } = require('../controllers/paymentController');
const  protect = require('../middleware/authMiddleware');

router.post('/card', protect(['User']), processCardPayment);
router.post('/installment', protect(['User']), processInstallmentPayment);

module.exports = router;