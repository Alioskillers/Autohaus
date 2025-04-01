const express = require('express');
const { verifyResetDetails, resetPassword } = require('../controllers/forgotPasswordController');

const router = express.Router();

router.post('/verify-reset', verifyResetDetails);
router.post('/reset-password', resetPassword);

module.exports = router;