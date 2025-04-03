const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');        
const VipAuth = require('../models/VipAuth');   

router.post('/vip-access', async (req, res) => {
  const userId = req.session && req.session.userId; 
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'VIP username and password are required' });
  }
  
  try {
    // Fetch the user to check their total orders and for email verification (optional)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if the user's total orders exceed $1M
    if (user.totalOrders < 1000000) {
      return res.status(403).json({ message: 'Access denied: Total orders do not exceed $1M' });
    }
    
    // Look up the VIP auth record for the authenticated user
    const vipAuth = await VipAuth.findOne({ user: userId });
    if (!vipAuth) {
      return res.status(403).json({ message: 'VIP access not configured for this user' });
    }
    
    // Optionally, verify that the email on the VIP record matches the user's email
    if (vipAuth.email && user.email && vipAuth.email !== user.email) {
      return res.status(403).json({ message: 'VIP record email does not match your account email' });
    }
    
    // Verify that the stored VIP username matches the one provided
    if (vipAuth.vipUsername !== username) {
      return res.status(403).json({ message: 'Invalid VIP username' });
    }
    
    // Compare the provided password with the stored hashed VIP password
    const isMatch = await bcrypt.compare(password, vipAuth.vipPassword);
    if (!isMatch) {
      return res.status(403).json({ message: 'Invalid VIP password' });
    }
    
    return res.json({ message: 'Access granted' });
  } catch (error) {
    console.error('VIP access error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;