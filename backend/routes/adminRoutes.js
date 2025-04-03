const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const VipAuth = require('../models/VipAuth');


router.post('/admin/verify-password', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.role !== 'Admin') {
        return res.status(403).json({ message: 'User is not authorized as admin' });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.json({ message: 'Verification successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.post('/admin/vip-settings', async (req, res) => {
    const { email, vipUsername, vipPassword } = req.body;
    if (!email || !vipUsername || !vipPassword) {
      return res.status(400).json({ message: 'Email, VIP username and VIP password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(vipPassword, saltRounds);
  
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