const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  searchOrders,
  getTotalSales,
  getOrderStats,
  getSalesChart
} = require('../controllers/adminOrderController');
const protect = require('../middleware/authMiddleware');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/',cacheMiddleware(() => 'admin_orders_all', 300), protect(['Admin','Global-Admin']), getAllOrders);
router.get('/search', protect(['Admin','Global-Admin']), searchOrders);
router.get('/total-sales', cacheMiddleware(() => 'admin_total_sales', 300), protect(['Admin','Global-Admin']), getTotalSales);
router.get('/stats/daily', cacheMiddleware(() => 'admin_order_stats_daily', 300), protect(['Admin','Global-Admin']), getOrderStats);
router.get('/sales-chart', cacheMiddleware(() => 'admin_sales_chart', 300), protect(['Admin','Global-Admin']),getSalesChart);

module.exports = router;