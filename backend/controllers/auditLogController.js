const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('carId');

    const simplifiedLogs = logs.map(log => {
      const stockUpdate = log.updates || {};
      return {
        userEmail: log.userEmail,
        car: log.carId ? `${log.carId.make} ${log.carId.model}` : '—',
        addedStock: stockUpdate.addedStock ?? stockUpdate.stock ?? null,
        newStock: stockUpdate.newStock ?? stockUpdate.stock ?? null,
        timestamp: log.timestamp
      };
    });

    res.json(simplifiedLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};