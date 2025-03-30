const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .populate('carId', 'make model');

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};