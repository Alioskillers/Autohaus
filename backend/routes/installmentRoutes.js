// backend/routes/installmentRoutes.js
const express = require('express');
const router = express.Router();
const { createInstallmentPlan, calculateInstallment } = require('../controllers/installmentController');
const protect = require('../middleware/authMiddleware');

// POST /api/installments => Save actual installment to DB
router.post('/', protect(['User']), createInstallmentPlan);

// ✅ POST /api/installments/calculate => Return calculations only (no save)
router.post('/calculate', protect(['User']), calculateInstallment);

module.exports = router;