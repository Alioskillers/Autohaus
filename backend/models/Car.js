const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  topSpeed: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String }, // path to local image
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);