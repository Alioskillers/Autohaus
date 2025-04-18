const express = require('express');
const { verifyResetDetails, resetPassword, verifyOtp } = require('../controllers/forgotPasswordController');

const router = express.Router();

router.post('/verify-reset', verifyResetDetails);
router.post('/reset-password', resetPassword);
router.post('/verify-otp', verifyOtp);

module.exports = router;