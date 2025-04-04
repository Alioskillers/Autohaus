const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/verify-management', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!['Admin', 'Global-Admin'].includes(user.role))
      return res.status(403).json({ message: 'Unauthorized' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Verification successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;