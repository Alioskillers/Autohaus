const express = require('express');
const router = express.Router();
const { createDowntime, getCurrentDowntime } = require('../controllers/downtimeController');
const protect = require('../middleware/authMiddleware');

router.post('/create', protect(['Global-Admin']), createDowntime);
router.get('/current', getCurrentDowntime);

module.exports = router;