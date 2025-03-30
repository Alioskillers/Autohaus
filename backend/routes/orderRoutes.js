const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect(['User']), placeOrder);
router.get('/my-orders', protect(['User']), getUserOrders);

module.exports = router;