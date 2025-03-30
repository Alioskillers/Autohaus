const express = require('express');
const router = express.Router();
const { placePurchaseOrder, placeRentalOrder, getUserOrders } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware'); // ✅ default import

router.get('/my-orders', protect(['User']), getUserOrders);

router.post('/', protect(['User']), (req, res) => {
  const { type } = req.body;
  if (type === 'rent') return placeRentalOrder(req, res);
  else return placePurchaseOrder(req, res);
});

module.exports = router;