const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');           // Adjust the path as needed
const VipAuth = require('../models/VipAuth');


router.post('/admin/verify-password', async (req, res) => {
    // Decompose the login API
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is an admin
      if (user.role !== 'Admin') {
        return res.status(403).json({ message: 'User is not authorized as admin' });
      }
  
      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If credentials are valid, respond with a success message
      // (You might choose to generate a token here if needed, but for verification, we simply confirm success)
      res.json({ message: 'Verification successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// POST /api/admin/vip-settings
router.post('/admin/vip-settings', async (req, res) => {
    const { email, vipUsername, vipPassword } = req.body;
    if (!email || !vipUsername || !vipPassword) {
      return res.status(400).json({ message: 'Email, VIP username and VIP password are required' });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Hash the VIP password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(vipPassword, saltRounds);
  
      // Update or create the VIP auth record for this user
      const vipAuth = await VipAuth.findOneAndUpdate(
        { user: user._id },
        { vipUsername, vipPassword: hashedPassword },
        { new: true, upsert: true }
      );
  
      return res.json({ message: 'VIP settings updated for user' });
    } catch (error) {
      console.error('Error updating VIP settings:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;