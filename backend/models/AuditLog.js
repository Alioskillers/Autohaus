const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  updates: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);