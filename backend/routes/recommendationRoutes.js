const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const protect = require('../middleware/authMiddleware'); // ✅ default import

router.get('/', protect(['User']), getRecommendations);

module.exports = router;