const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  period: { type: Number, required: true }, // in years
  frequency: { type: String, enum: ['monthly', 'quarterly', 'semi-annually', 'annually'], required: true },
  installmentAmount: { type: Number, required: true },
  totalPayments: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Installment', installmentSchema);