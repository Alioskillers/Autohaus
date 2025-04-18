const mongoose = require('mongoose');

// Define the schema for VIP cars
const vipCarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  topSpeed: { type: Number, required: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('VipCar', vipCarSchema);