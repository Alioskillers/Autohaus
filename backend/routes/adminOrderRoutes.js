const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  searchOrders,
  getTotalSales,
  getOrderStats,
  getSalesChart
} = require('../controllers/adminOrderController');
const protect = require('../middleware/authMiddleware'); // ✅ default import

// Admin-only access
router.get('/', protect(['Admin']), getAllOrders);
router.get('/search', protect(['Admin']), searchOrders);
router.get('/total-sales', protect(['Admin']), getTotalSales);
router.get('/stats/daily', protect(['Admin']), getOrderStats);
router.get('/sales-chart', protect(['Admin']),getSalesChart);

module.exports = router;