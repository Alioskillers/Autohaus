const mongoose = require('mongoose');

const downtimeSchema = new mongoose.Schema(
  {
    startTime: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    reason: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Downtime', downtimeSchema);