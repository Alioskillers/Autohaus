const express = require('express');
const router = express.Router();
const {
  getBasket,
  addToBasket,
  updateQuantity,
  removeFromBasket,
  clearBasket,
  saveBasketToDB
} = require('../controllers/basketController');

const protect = require('../middleware/authMiddleware'); // ✅ FIXED here

router.get('/', protect(['User']), getBasket);
router.post('/add', protect(['User']), addToBasket);
router.put('/update', protect(['User']), updateQuantity);
router.delete('/remove', protect(['User']), removeFromBasket);
router.delete('/clear', protect(['User']), clearBasket);
router.post('/', protect(['User']), saveBasketToDB);

module.exports = router;