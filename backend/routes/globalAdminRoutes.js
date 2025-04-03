const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/verify', async (req, res) => {
    const { username, password } = req.body;
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          if (user.role !== 'Global-Admin') {
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

router.post('/create-admin', async (req, res) => {
  const { email, username, password, phone } = req.body;

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return res.status(400).json({ message: 'Email or username already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new User({
    email,
    username,
    phone,
    password: hashedPassword,
    role: 'Admin'
  });

  await newAdmin.save();
  res.status(201).json({ message: 'New Admin created by Global-Admin' });
});

module.exports = router;