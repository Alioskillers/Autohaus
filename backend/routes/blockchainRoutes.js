const express = require("express");
const router = express.Router();
const blockchainController = require("../controllers/blockchainController");

router.post("/record", blockchainController.recordPurchase);

module.exports = router;