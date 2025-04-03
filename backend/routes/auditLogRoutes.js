const express = require('express');
const router = express.Router();
const { getAuditLogs } = require('../controllers/auditLogController');
const protect = require('../middleware/authMiddleware'); // ✅ default import

router.get('/', protect(['Admin','Global-Admin']), getAuditLogs);

module.exports = router;