const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.verifyWorker = async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({ username });
      if (!user || !(user.role === 'Worker' || user.role === 'Workers-Admin')) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.json({ message: 'Verification successful' });
    } catch (err) {
      console.error('Verification error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.verifyWorkerAdmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user || user.role !== 'Workers-Admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.json({ message: 'Verification successful' });
    } catch (err) {
      console.error('Verification error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };