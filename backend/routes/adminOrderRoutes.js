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
router.get('/', protect(['Admin','Global-Admin']), getAllOrders);
router.get('/search', protect(['Admin','Global-Admin']), searchOrders);
router.get('/total-sales', protect(['Admin','Global-Admin']), getTotalSales);
router.get('/stats/daily', protect(['Admin','Global-Admin']), getOrderStats);
router.get('/sales-chart', protect(['Admin','Global-Admin']),getSalesChart);

module.exports = router;