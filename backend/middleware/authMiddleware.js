const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes and optionally restrict access to specific roles.
 * Usage: protect(['Admin']), protect(['Worker', 'Admin']), protect()
 */
const protect = (allowedRoles = []) => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

// ✅ Use named export to match routes
module.exports = protect;