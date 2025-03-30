const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  type: { type: String, enum: ['rent', 'purchase'], required: true },
  period: { type: Number }, // only for rent
  receiptNumber: { type: String, required: true, unique: true },
  deliveryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);