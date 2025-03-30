const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
      quantity: { type: Number, default: 1 }
    }
  ]
});

module.exports = mongoose.model('Basket', basketSchema);