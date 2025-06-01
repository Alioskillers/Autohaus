const express = require("express");
const router = express.Router();
const {recordPurchase} = require("../controllers/blockchainController");
const protect = require('../middleware/authMiddleware');

router.post("/record",protect(['User']), recordPurchase);

module.exports = router;