const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect(['User']), getRecommendations);

module.exports = router;