const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

// Admin: Get all users
router.get('/', protect(['Admin']), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Admin: Delete a user by email
router.delete('/:email', protect(['Admin']), async (req, res) => {
  const result = await User.deleteOne({ email: req.params.email });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted' });
});

module.exports = router;