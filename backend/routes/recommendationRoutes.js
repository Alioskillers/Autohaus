const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const protect = require('../middleware/authMiddleware');
const { cacheMiddleware } = require('../middleware/cache');

router.get(
  '/',
  protect(['User']),
  cacheMiddleware((req) => `user_recommendations_${req.user._id}`, 300),
  getRecommendations
);

module.exports = router;